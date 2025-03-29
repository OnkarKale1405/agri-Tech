// Gemini AI service for agricultural technology analysis
import { Platform } from 'react-native';

// Direct API configuration with provided key
const API_KEY = "AIzaSyCztjmipRapoDY1gp-VcMD0WF0YkO6fTiY";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface FarmingAnalysisParams {
  farmingTechnique: string;
  farmSize: number;
  budget: string;
  cropType: string;
}

export interface FarmingAnalysis {
  techniqueAnalysis: {
    overview: {
      name: string;
      estimatedCost: number;
      roi: number;
      successRate: number;
      timeToRoi: string;
      sustainabilityScore: number;
    }
  };
  implementation: {
    phases: {
      name: string;
      duration: string;
      description: string;
      keyMilestones: string[];
      estimatedCost: number;
    }[];
  };
  metrics: {
    resourceEfficiency: {
      water: number;
      labor: number;
      energy: number;
      yield: number;
      sustainability: number;
    };
    environmentalImpact: {
      carbonFootprint: number;
      waterConservation: number;
      soilHealth: number;
    };
  };
}

export const generateFarmingAnalysis = async (params: FarmingAnalysisParams): Promise<FarmingAnalysis> => {
  try {
    // Build the prompt based on the user input
    const prompt = `You are an AI agricultural technology expert. Generate a comprehensive modern farming analysis report in JSON format for:

Technique: ${params.farmingTechnique}
Farm Size: ${params.farmSize} acres
Budget Range: ${params.budget}
Crop Type: ${params.cropType}

Return your analysis as a JSON object with this expanded structure:
{
  "techniqueAnalysis": {
    "overview": {
      "name": string,
      "estimatedCost": number,
      "roi": number,
      "successRate": number,
      "timeToRoi": string,
      "sustainabilityScore": number
    }
  },
  "implementation": {
    "phases": [
      {
        "name": string,
        "duration": string,
        "description": string,
        "keyMilestones": string[],
        "estimatedCost": number
      }
    ]
  },
  "metrics": {
    "resourceEfficiency": {
      "water": number,
      "labor": number,
      "energy": number,
      "yield": number,
      "sustainability": number
    },
    "environmentalImpact": {
      "carbonFootprint": number,
      "waterConservation": number,
      "soilHealth": number
    }
  }
}

Guidelines:
1. Ensure realistic cost estimates based on budget range
2. ROI should be random value between 10-40
3. Include 5 detailed and super relevent implementation phases specific to the selected crop type
4. All numeric metrics should be on a scale of 0-100
5. Consider local agricultural conditions and seasonal variations for the selected crop
6. Provide practical and actionable implementation steps
7. Focus on sustainable practices and environmental impact
8. Include specific timeframes for ROI and implementation phases
9. Consider technology integration and modern farming practices
10. Account for resource optimization and efficiency metrics
11. Do not treat waste queries simply return "No data available" or "Not Applicable"
12. Do not reply to wrong queries which might be sensitive in nature or malicious in nature
13. Do not reply to queries which are not related to modern farming or agriculture practices
14. Adapt all recommendations to be specific for the selected crop type`;

    // Request body for Gemini API
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
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

    // Make the API call - using the URL that already includes the API key
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
    console.error('Error generating farming analysis:', error);
    throw error;
  }
}; 