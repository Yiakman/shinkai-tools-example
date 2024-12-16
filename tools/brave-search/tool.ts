
import axios from 'npm:axios@1.7.7';

type CONFIG = {
  apiKey?: string;
};

type INPUTS = {
  message: string;
};

type OUTPUT = { message: string };

export interface SearchResult {
  title: string;
  description: string;
  url: string;
}

const braveSearchBase = 'https://api.search.brave.com/res/v1/web/search';

const textSearch = async (keywords: string, apiKey?: string): Promise<SearchResult[]> => {
  // Validate API key
  if (!apiKey) {
    throw new Error('Brave Search API key is required');
  }

  // Brave Search API parameters
  const params = {
    q: keywords,
    count: 5, // Number of results
    safesearch: 'moderate',
    text_decorations: false
  };

  try {
    const response = await axios.get(braveSearchBase, {
      params,
      headers: {
        'X-Subscription-Token': apiKey,
        'Accept': 'application/json'
      }
    });

    // Parse Brave Search response
    const results: SearchResult[] = response.data.web.results.map((item: any) => ({
      title: item.title,
      description: item.description,
      url: item.url
    })).filter(
      (result: SearchResult) => 
        result.title && result.description && result.url
    );

    return results;
  } catch (error) {
    console.error('Brave Search API Error:', error);
    throw error;
  }
};

export const run = async (
  configurations: CONFIG,
  params: INPUTS,
): Promise<OUTPUT> => {
  console.log('run Brave search from js', 4);
  console.log('params: ', params);

  try {
    const results = await textSearch(params.message, configurations.apiKey);
    console.log(`BraveSearch: Found ${results.length} results`);
    return { message: JSON.stringify(results) };
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { message: `Error: ${errorMessage}` };
  }
};

export const braveSearch = async (
  keywords: string, 
  apiKey?: string
): Promise<OUTPUT> => {
  const result = await run({ apiKey }, { message: keywords });
  return result;
};

export const definition = {
  id: 'shinkai-tool-brave-search',
  name: 'Shinkai: Brave Search',
  description: 'Searches the Brave search engine. Requires a Brave Search API key.',
  author: 'Shinkai',
  keywords: ['brave', 'search', 'shinkai'],
  configurations: {
    type: 'object',
    properties: {
      apiKey: { 
        type: 'string', 
        description: 'API key for Brave Search' 
      }
    },
    required: ['apiKey']
  },
  parameters: {
    type: 'object',
    properties: {
      message: { type: 'string' }
    },
    required: ['message']
  },
  result: {
    type: 'object',
    properties: {
      message: { type: 'string' }
    },
    required: ['message']
  }
};
