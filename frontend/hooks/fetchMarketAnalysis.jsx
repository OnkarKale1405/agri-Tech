import axios from "axios";

const API_KEY = "AIzaSyCztjmipRapoDY1gp-VcMD0WF0YkO6fTiY";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export const fetchMarketAnalysis = async (city, crop) => {
    const promptText = `
    You are an AI crop market analyst. Generate a market analysis report in JSON format for the following parameters:

    City: ${city}
    State: Maharashtra
    Crop: ${crop}
    Date Range: current
    Include historical data in analysis

    Return your analysis as a JSON object with this exact structure:
    {
      "marketAnalysis": {
          "summary": {
              "currentPrice": number,
              "priceChange": number,
              "tradingVolume": number,
              "marketSentiment": string
          },
          "visualizations": [],
          "insights": []
      },
      "qualityMetrics": {
          "gradeDistribution": {
              "premium": number,
              "standard": number,
              "substandard": number
          },
          "qualityParameters": []
      },
      "forecastMetrics": {
          "priceProjection": {
              "nextWeek": number,
              "nextMonth": number,
              "confidence": number
          },
          "supplyOutlook": {
              "trend": string,
              "factors": []
          }
      }
    }

    Important:
    1. Use realistic values based on current market conditions
    2. All number values should be positive
    3. Ensure currentPrice is between 1000 and 10000
    4. priceChange should be between -10 and +10
    5. Ensure the response is valid JSON
    6. Do not include any additional text or markdown formatting
    7. Give the AI Confidence always between 80-100% range only
  `;

    try {
        const response = await axios.post(API_URL, {
            contents: [{ parts: [{ text: promptText }] }],
        });

        let result = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!result) {
            throw new Error("Invalid response: No content returned");
        }

        // Remove code block markers if they exist
        result = result.replace(/```json|```/g, "").trim();

        return JSON.parse(result);
    } catch (error) {
        console.error("Error fetching market analysis:", error);
        throw error;
    }
};