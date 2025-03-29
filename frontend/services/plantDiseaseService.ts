// Plant Disease Detection service using Gemini AI API
import { PlantDiseaseAnalysis, DEFAULT_INVALID_ANALYSIS } from '../types/plantDisease';

// Using the same API key as the farming service
const API_KEY = "AIzaSyCztjmipRapoDY1gp-VcMD0WF0YkO6fTiY";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Function to encode image to base64
export const encodeImageToBase64 = async (uri: string): Promise<string> => {
  try {
    // Fetch the image as a blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Convert blob to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
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

// Function to analyze plant image and detect disease
export const analyzePlantDisease = async (imageUri: string): Promise<PlantDiseaseAnalysis> => {
  try {
    // Encode image to base64
    const base64Image = await encodeImageToBase64(imageUri);

    // Create the prompt for Gemini API
    const prompt = `As an expert agricultural pathologist, analyze the provided plant image and return a response strictly in JSON format. 
    
    Supported Plant Types:
    - Crops (cereals, pulses, oilseeds, etc.)
    - Fruits (tropical, subtropical, temperate)
    - Vegetables (root, leafy, fruit vegetables)
    - Trees (fruit-bearing, timber, ornamental)
    - Flowering plants, indoor/outdoor plants
    - Commercial and home garden plants
    - Hydroponic and aquaponic plants
    
    Validation Rules:
    1. Non-plant or irrelevant images: Return: { "diseaseName": "Not Applicable", "cropName": "Invalid Input", "confidenceLevel": 0, "diagnosisSummary": "This appears to be a non-plant image. Please provide a clear image of a plant for analysis.", "timeToTreat": "N/A", "estimatedRecovery": "N/A", "yieldImpact": "N/A", "severityLevel": "N/A" }
    2. Spam, inappropriate, or malicious queries: Return: { "diseaseName": "Invalid Query", "cropName": "Not Applicable", "confidenceLevel": 0, "diagnosisSummary": "Unable to process this query. Please provide appropriate plant-related images.", "timeToTreat": "N/A", "estimatedRecovery": "N/A", "yieldImpact": "N/A", "severityLevel": "N/A" }
    3. Valid plant images: Provide analysis in this JSON format:
    {
      "diseaseName": "string",
      "cropName": "string",
      "timeToTreat": "string",
      "estimatedRecovery": "string",
      "yieldImpact": "string",
      "severityLevel": "mild|medium|severe",
      "symptomDescription": "string",
      "environmentalFactors": [
        {
          "factor": "string",
          "currentValue": "string",
          "optimalRange": "string",
          "status": "optimal|warning|critical"
        }
      ],
      "realTimeMetrics": {
        "spreadRisk": {
          "level": "string",
          "value": number,
          "trend": "increasing|stable|decreasing"
        },
        "diseaseProgression": {
          "stage": "string",
          "rate": number,
        },
        "environmentalConditions": {
          "temperature": number,
          "humidity": number,
          "soilMoisture": number,
        }
      },
      "organicTreatments": ["string"],
      "ipmStrategies": ["string"],
      "preventionPlan": ["string"],
      "confidenceLevel": number,
      "diagnosisSummary": "string"
    }
    
    Analysis Requirements:
    - Identify any plant disease with high accuracy.
    - Provide correct crop name identification.
    - Deliver detailed environmental analysis.
    - Include real-time disease metrics.
    - Suggest organic and IPM-based treatments.
    - Outline clear prevention measures.
    - Maintain confidence level between 80%-100% for valid diagnoses.
    
    Important Guidelines:
    - Response must be pure JSON (no markdown formatting).
    - Use double quotes for all strings.
    - No explanatory text outside JSON.
    - No trailing commas.
    - Ensure realistic current environmental metrics with proper units (°C, %, etc.).`;

    // Request body for Gemini API
    const requestBody = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: base64Image
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1
      }
    };

    // Make the API call
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

    // Extract just the JSON part
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // If no JSON match, try to parse the entire text
    return JSON.parse(generatedText);
  } catch (error) {
    console.error('Error analyzing plant disease:', error);
    return DEFAULT_INVALID_ANALYSIS;
  }
}; 