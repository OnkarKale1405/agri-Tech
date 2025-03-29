// Agri-News Service - combines Tavily search with Gemini AI for enhanced insights
import { searchAgricultureNews, searchGovernmentSchemes, SearchResult } from './tavilyService';

// Direct API configuration with provided key
const API_KEY = "AIzaSyCztjmipRapoDY1gp-VcMD0WF0YkO6fTiY";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface NewsResult {
  summary: string;
  insights: string;
  articles: {
    title: string;
    url: string;
    source?: string;
    summary: string;
    date?: string;
    imageUrl?: string;
  }[];
}

export interface SchemeResult {
  summary: string;
  howToApply: string;
  eligibility: string;
  benefits: string;
  schemes: {
    title: string;
    url: string;
    description: string;
    applicationProcess?: string;
    eligibility?: string;
    benefits?: string;
    deadline?: string;
  }[];
}

/**
 * Processes search results with Gemini to create enhanced news summaries
 * @param searchResults Raw results from Tavily search
 * @returns Processed news with summary and insights
 */
const processNewsWithGemini = async (searchResults: SearchResult): Promise<NewsResult> => {
  try {
    // Create context for Gemini from search results
    const articlesContext = searchResults.results
      .map(result => `Title: ${result.title}\nSource: ${result.source || 'Unknown'}\nDate: ${result.published_date || 'Recent'}\nContent: ${result.content}\nURL: ${result.url}`)
      .join('\n\n');

    // Build the prompt
    const prompt = `You are an AI agricultural assistant for Indian farmers. Analyze these recent agriculture news articles and provide:

1. A concise summary (2-3 paragraphs) of the most important agricultural news for Indian farmers
2. Key insights and practical advice for farmers based on these news items (bullet points)
3. A structured list of the most relevant articles with brief summaries

Here are the articles:
${articlesContext}

Return your response in this JSON format:
{
  "summary": "Comprehensive summary of the key agricultural news",
  "insights": "Practical insights and advice for farmers based on the news",
  "articles": [
    {
      "title": "Article title",
      "url": "Article URL",
      "source": "Source name",
      "summary": "Brief summary of this specific article",
      "date": "Publication date if available",
      "imageUrl": "Image URL if available"
    }
  ]
}

Ensure the summary is relevant for Indian farmers, and the added URL is correct, focuses on actionable information, and is easy to understand.`;

    // Request body for Gemini API
    const requestBody = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
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
      throw new Error(`Gemini API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    // Extract the JSON part
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error("Failed to parse Gemini response");
  } catch (error) {
    console.error('Error processing news with Gemini:', error);
    throw error;
  }
};

/**
 * Processes scheme search results with Gemini to create structured scheme information
 * @param searchResults Raw results from Tavily search
 * @returns Processed schemes with application steps and eligibility
 */
const processSchemesWithGemini = async (searchResults: SearchResult): Promise<SchemeResult> => {
  try {
    // Create context for Gemini from search results
    const schemesContext = searchResults.results
      .map(result => `Title: ${result.title}\nSource: ${result.source || 'Unknown'}\nContent: ${result.content}\nURL: ${result.url}`)
      .join('\n\n');

    // Build the prompt
    const prompt = `You are an AI assistant specializing in Indian agricultural policies and government schemes. Analyze these government schemes for Indian farmers and provide:

1. A clear summary of the most important current schemes and subsidies (2-3 paragraphs)
2. Detailed steps on how farmers can apply for these schemes (numbered list)
3. Clear eligibility criteria for these schemes (bullet points)
4. Key benefits farmers can expect (bullet points)
5. A structured list of the schemes with descriptions and application processes

Here are the scheme details:
${schemesContext}

Return your response in this JSON format:
{
  "summary": "Summary of key government schemes and subsidies for farmers",
  "howToApply": "Step-by-step process for applying to these schemes",
  "eligibility": "General eligibility criteria for these schemes",
  "benefits": "Key benefits farmers can expect from these schemes",
  "schemes": [
    {
      "title": "Scheme name",
      "url": "Official scheme URL",
      "description": "Detailed description of the scheme",
      "applicationProcess": "Steps to apply for this specific scheme",
      "eligibility": "Eligibility criteria for this scheme",
      "benefits": "Benefits of this specific scheme",
      "deadline": "Application deadline if available"
    }
  ]
}

Ensure the information is accurate, existing added URL is correct, up-to-date, and presented in simple language that farmers can easily understand.`;

    // Request body for Gemini API
    const requestBody = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
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
      throw new Error(`Gemini API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    // Extract the JSON part
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error("Failed to parse Gemini response");
  } catch (error) {
    console.error('Error processing schemes with Gemini:', error);
    throw error;
  }
};

/**
 * Fetches and processes agricultural news for Indian farmers
 * @param topic Optional specific topic to search for
 * @returns Processed news with summaries and insights
 */
export const getAgricultureNews = async (topic?: string): Promise<NewsResult> => {
  try {
    // First, search for news using Tavily
    const searchResults = await searchAgricultureNews(topic);

    // Then process the results with Gemini
    return await processNewsWithGemini(searchResults);
  } catch (error) {
    console.error('Error getting agriculture news:', error);
    throw error;
  }
};

/**
 * Fetches and processes government schemes for Indian farmers
 * @param schemeType Optional type of scheme to search for
 * @returns Processed schemes with application steps and eligibility
 */
export const getGovernmentSchemes = async (schemeType?: string): Promise<SchemeResult> => {
  try {
    // First, search for schemes using Tavily
    const searchResults = await searchGovernmentSchemes(schemeType);

    // Then process the results with Gemini
    return await processSchemesWithGemini(searchResults);
  } catch (error) {
    console.error('Error getting government schemes:', error);
    throw error;
  }
}; 