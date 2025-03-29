// Tavily API service for real-time agricultural news and information
// This service integrates with Tavily's search API to fetch relevant news and information

const TAVILY_API_KEY = "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";
const TAVILY_API_URL = "https://api.tavily.com/search";

export interface SearchParams {
  query: string;
  search_depth?: "basic" | "advanced";
  include_domains?: string[];
  exclude_domains?: string[];
  include_answer?: boolean;
  max_results?: number;
}

export interface SearchResult {
  id: string;
  answer?: string;
  query: string;
  results: {
    title: string;
    url: string;
    content: string;
    score: number;
    published_date?: string;
    source?: string;
    image_url?: string;
  }[];
}

/**
 * Performs a search using the Tavily API
 * @param params Search parameters
 * @returns Search results
 */
export const performSearch = async (params: SearchParams): Promise<SearchResult> => {
  try {
    const searchParams = {
      api_key: TAVILY_API_KEY,
      query: params.query,
      search_depth: params.search_depth || "advanced",
      include_domains: params.include_domains,
      exclude_domains: params.exclude_domains,
      include_answer: params.include_answer ?? true,
      max_results: params.max_results || 10
    };

    const response = await fetch(TAVILY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParams),
    });

    if (!response.ok) {
      throw new Error(`Tavily API call failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error performing Tavily search:', error);
    throw error;
  }
};

/**
 * Searches for agricultural news specifically for Indian farmers
 * @param topic Specific topic to search for (optional)
 * @returns Search results focused on Indian agricultural news
 */
export const searchAgricultureNews = async (topic?: string): Promise<SearchResult> => {
  const query = topic 
    ? `latest Indian agriculture news about ${topic} for farmers`
    : 'latest Indian agriculture news for farmers';

  // Add relevant domains for Indian agricultural news
  const includeDomains = [
    'agricoop.nic.in',  // Ministry of Agriculture & Farmers Welfare
    'farmer.gov.in',    // Farmers Portal
    'icar.org.in',      // Indian Council of Agricultural Research
    'agmarknet.gov.in', // Agricultural Marketing Information Network
    'krishijagran.com', // Krishi Jagran
    'ruralhelpline.com' // Rural Helpline
  ];

  return performSearch({
    query,
    include_domains: includeDomains,
    search_depth: "advanced",
    include_answer: true,
    max_results: 15
  });
};

/**
 * Searches for government schemes and subsidies for Indian farmers
 * @param schemeType Type of scheme to search for (optional)
 * @returns Search results focused on government schemes
 */
export const searchGovernmentSchemes = async (schemeType?: string): Promise<SearchResult> => {
  const query = schemeType 
    ? `latest Indian government ${schemeType} schemes and subsidies for farmers`
    : 'latest Indian government schemes and subsidies for farmers';

  // Add relevant government domains
  const includeDomains = [
    'agricoop.nic.in',      // Ministry of Agriculture & Farmers Welfare
    'farmer.gov.in',        // Farmers Portal
    'pmkisan.gov.in',       // PM-KISAN Scheme
    'nabard.org',           // National Bank for Agriculture and Rural Development
    'pib.gov.in',           // Press Information Bureau
    'india.gov.in',         // National Portal of India
    'sfacindia.com',        // Small Farmers Agribusiness Consortium
    'enam.gov.in'           // e-National Agriculture Market
  ];

  return performSearch({
    query,
    include_domains: includeDomains,
    search_depth: "advanced",
    include_answer: true,
    max_results: 15
  });
}; 