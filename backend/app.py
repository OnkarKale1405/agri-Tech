import os
import time
import numpy as np
import matplotlib.pyplot as plt
from flask import Flask,send_from_directory, request, jsonify
from sentinelhub import SHConfig, SentinelHubRequest, DataCollection, MimeType, BBox, CRS

# Flask App
app = Flask(__name__)

# Sentinel Hub Credentials
CLIENT_ID = "dc9390a2-f1bf-406a-8f44-4445b8a4b7aa"
CLIENT_SECRET = "nh6KdAM0wKv1tYyEUVag3aNHtBIJ9BCQ"

# Sentinel Hub Configuration
config = SHConfig()
config.sh_client_id = CLIENT_ID
config.sh_client_secret = CLIENT_SECRET
config.save()

SATELLITE_DATA_FOLDER = os.path.join(os.getcwd(), "backend", "satellite_data")

@app.route("/get_images", methods=["GET"])
def get_images():
    """Returns a list of image URLs from the satellite_data folder"""
    image_files = [f for f in os.listdir(SATELLITE_DATA_FOLDER) if f.endswith(".png")]
    image_urls = [f"http://127.0.0.1:5000/get_image/{img}" for img in image_files]

    return jsonify({"images": image_urls})

@app.route("/get_image/<filename>")
def get_image(filename):
    """Serves a specific image from satellite_data"""
    return send_from_directory(SATELLITE_DATA_FOLDER, filename)

# Set a fixed output directory
OUTPUT_DIR = "satellite_data"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def fetch_satellite_insights(latitude, longitude):
    """Fetch Sentinel-2 imagery, generate insights, and save images in a fixed directory."""
    delta = 0.01  # ±1.1 km
    bbox = BBox(bbox=[longitude - delta, latitude - delta, longitude + delta, latitude + delta], crs=CRS.WGS84)
    time_interval = ('2024-03-01', '2024-03-10')
    
    evalscript = """
    //VERSION=3
    function setup() {
        return { input: ["B04", "B03", "B02", "B08", "B11", "B12"], output: { bands: 6 } };
    }
    function evaluatePixel(sample) {
        var ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04);
        var ndwi = (sample.B08 - sample.B11) / (sample.B08 + sample.B11);
        var burned_index = (sample.B12 - sample.B08) / (sample.B12 + sample.B08);
        return [sample.B04, sample.B03, sample.B02, ndvi, ndwi, burned_index];
    }
    """

    request = SentinelHubRequest(
        evalscript=evalscript,
        input_data=[SentinelHubRequest.input_data(DataCollection.SENTINEL2_L1C, time_interval=time_interval)],
        responses=[SentinelHubRequest.output_response("default", MimeType.TIFF)],
        bbox=bbox,
        size=(512, 512),
        config=config
    )
    
    response = request.get_data()
    
    if response and len(response) > 0:
        image = np.array(response[0])
        red, green, blue, ndvi, ndwi, burned_index = image[:, :, 0], image[:, :, 1], image[:, :, 2], image[:, :, 3], image[:, :, 4], image[:, :, 5]

        plt.imsave(os.path.join(OUTPUT_DIR, "rgb_image.png"), np.stack([red, green, blue], axis=-1))
        plt.imsave(os.path.join(OUTPUT_DIR, "ndvi.png"), ndvi, cmap="RdYlGn")
        plt.imsave(os.path.join(OUTPUT_DIR, "ndwi.png"), ndwi, cmap="Blues")
        plt.imsave(os.path.join(OUTPUT_DIR, "burned_index.png"), burned_index, cmap="hot")

        return {
            "coordinates": {"latitude": latitude, "longitude": longitude},
            "vegetation_health": {"ndvi_mean": float(np.mean(ndvi))},
            "water_analysis": {"ndwi_mean": float(np.mean(ndwi))},
            "potential_fire_risk": {"burned_index_mean": float(np.mean(burned_index))},
            "image_folder": OUTPUT_DIR
        }
    else:
        return None

@app.route('/analyze', methods=['POST'])
def analyze():
    latitude = request.args.get('latitude', type=float)
    longitude = request.args.get('longitude', type=float)
    
    if latitude is None or longitude is None:
        return jsonify({"error": "Latitude and longitude are required"}), 400
    
    insights = fetch_satellite_insights(latitude, longitude)
    if insights:
        return jsonify(insights)
    else:
        return jsonify({"error": "No data available"}), 500

if __name__ == '__main__':
    app.run(debug=True)