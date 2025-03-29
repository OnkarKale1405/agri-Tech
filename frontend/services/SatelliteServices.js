const API_KEY = "AIzaSyCztjmipRapoDY1gp-VcMD0WF0YkO6fTiY";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const BACKEND_URL = "http://127.0.0.1:5000/";  // Replace with actual Flask backend URL

// Function to fetch images from Flask API
const fetchImagesFromBackend = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/get_images`);
        const data = await response.json();
        return data.images;
    } catch (error) {
        console.error("Error fetching images from backend:", error);
        return [];
    }
};

// Function to encode image to Base64
const encodeImageToBase64 = async (uri) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    const base64 = reader.result.split(',')[1];
                    resolve(base64);
                } else {
                    reject(new Error('Failed to convert image to base64'));
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error encoding image to base64:', error);
        throw error;
    }
};

// Function to analyze plant disease from images fetched from backend
const analyzeSatellite = async () => {
    try {
        const imageUris = await fetchImagesFromBackend();

        if (imageUris.length === 0) {
            throw new Error("No images found on the backend.");
        }

        // Encode images to Base64
        const base64Images = await Promise.all(imageUris.map(uri => encodeImageToBase64(uri)));

        // Create the prompt
        const prompt = `Analyze the given satellite images and provide a structured JSON response with the following details:
            "response_format": {
                "vegetation_health": {
                    "NDVI": "Normalized Difference Vegetation Index value (float, range -1 to 1)",
                    "NDWI": "Normalized Difference Water Index value (float, range -1 to 1)",
                    "MSAVI": "Modified Soil-Adjusted Vegetation Index value (float, range -1 to 1)",
                    "health_status": "Overall vegetation health assessment (Healthy/Stressed/Dry)"
                },

                "crop_diseases": [
                    {
                        "disease_name": "Name of the detected disease (if any)",
                        "affected_crop": "Crop type affected",
                        "severity": "Severity level (Low/Moderate/High)",
                        "confidence_score": "Confidence score (0-100%)"
                    }
                ],

                "soil_moisture_analysis": {
                    "moisture_level": "Moisture percentage",
                    "soil_degradation": "Yes/No",
                    "drought_stress": "Yes/No"
                },

                "pest_infestation": [
                    {
                        "pest_type": "Type of pest detected",
                        "affected_area_percentage": "Percentage of affected crop area",
                        "severity": "Severity level (Low/Moderate/High)"
                    }
                ],

                "crop_yield_prediction": {
                    "growth_stage": "Current growth stage of the crop",
                    "estimated_yield": "Predicted yield in kg/ha"
                },

                "land_use_monitoring": {
                    "deforestation_detected": "Yes/No",
                    "urban_expansion": "Yes/No",
                    "land_cover_change": "Brief description of detected changes"
                }
            }`;

        // Create request body
        const requestBody = {
            contents: [
                {
                    parts: [
                        { text: prompt },
                        ...base64Images.map(base64 => ({
                            inline_data: {
                                mime_type: "image/png",
                                data: base64
                            }
                        }))
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.4,
                topK: 32,
                topP: 1
            }
        };

        // Make API request
        const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();

        // Extract the generated text
        const generatedText = data.candidates[0].content.parts[0].text;

        // Extract and parse JSON
        const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return JSON.parse(generatedText);
    } catch (error) {
        console.error('Error analyzing plant disease:', error);
        return { error: "Failed to analyze plant disease" };
    }
};

// Run the analysis
analyzeSatellite()
    .then(result => console.log('Analysis Result:', result))
    .catch(error => console.error('Error:', error));