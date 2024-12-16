// These environment variables are required, before any import.
// Do not remove them, as they set environment variables for the Shinkai Tools.
Deno.env.set('SHINKAI_NODE_LOCATION', "http://localhost:9950");
Deno.env.set('BEARER', "debug");
Deno.env.set('X_SHINKAI_TOOL_ID', "tool-id-debug");
Deno.env.set('X_SHINKAI_APP_ID', "tool-app-debug");
Deno.env.set('X_SHINKAI_LLM_PROVIDER', "gpt_4o_mini");
Deno.env.set('SHINKAI_HOME', "results/typescript/typescript-00001-benchmark-oauth-github/qwen2-5-coder-32b/editor/home");
Deno.env.set('SHINKAI_MOUNT', "results/typescript/typescript-00001-benchmark-oauth-github/qwen2-5-coder-32b/editor/mount");
Deno.env.set('SHINKAI_ASSETS', "results/typescript/typescript-00001-benchmark-oauth-github/qwen2-5-coder-32b/editor/assets");
Deno.env.set('SHINKAI_OAUTH', JSON.stringify([]));

///// START CODE /////

import { duckduckgoSearch } from '../../duckdukgo.ts';
import { braveSearch } from '../brave-search/tool.ts';
import { searchEngineQueryGenerator } from './prompts/search-engine-query-generator.ts';
import { answerGenerator } from './prompts/responsePrompt.ts';
import { statementExtract } from './prompts/statement-extract.ts';
import {
  shinkaiDownloadPages,
  shinkaiLlmPromptProcessor,
  //shinkaiDuckduckgoSearch,
  //wolframAlphaSearch,
} from '../../shinkai-local-tools.ts';

type CONFIG = {
  searchEngineApiKey?: string;
  searchEngine?: SearchEngine;
}
type INPUTS = {
  question: string;
};
type OUTPUT =  {
  response: string;
  sources: SmartSearchSourcePage[];
  statements: SmartSearchStatement[];
}
type PREFFERED_SOURCES = 'WIKIPEDIA'|'WOLFRAMALPHA'|'OTHER';
type SearchQueryConversion = {
  "origin_question": string;
  "preferred_sources": PREFFERED_SOURCES[];
  "search_query": string
}


type SearchResult = {
  title: string;
  description: string;
  url: string;
}
type SmartSearchSource = SearchResult | string;
type SearchEngine = 'DUCKDUCKGO' | 'BRAVE' | 'Google'

export interface SmartSearchSourcePage {
  id: number;
  url: string;
  markdown?: string;
  title: string;
}

export interface SmartSearchStatement {
  sourceId: number;
  sourceTitle: string;
  extractedFacts: {
    statement: string;
    relevance: 'DIRECT_ANSWER' | 'HIGHLY_RELEVANT' | 'SOMEWHAT_RELEVANT' | 'TANGENTIAL' | 'NOT_RELEVANT';
  }[];
}
export interface SmartSearchGenerationContext {
  originalQuestion: string;
  statements: SmartSearchStatement[];
  sources: SmartSearchSourcePage[];
}

const ProcessQuestionError = (step: string, error: Error): string =>
  `Failed to process question at ${step}: ${error.message}`;

async function conversionToSearchQuery(question: string): Promise<SearchQueryConversion> {
  const prompt = searchEngineQueryGenerator(question);
  const optimizedQueryResult = await shinkaiLlmPromptProcessor('text', prompt);
  try {
    const result = JSON.parse(optimizedQueryResult.message.trim()) as SearchQueryConversion;
    return result;
  } catch (error) {
    throw new Error(ProcessQuestionError('question processing', new Error(String(error))));
  }
}

async function extractSourcesFromSearchEngine(
  searchQuery: string,
  engine: SearchEngine,
  apiKey?: string,
): Promise<SearchResult[]> {
  switch (engine) {
    case 'DUCKDUCKGO': {
      const results = await duckduckgoSearch(searchQuery);
      try {
        return JSON.parse(results.message) as SearchResult[];
      } catch (error) {
        console.error('Failed to process duckduckgo search results', error);
        throw new Error('Failed to process duckduckgo search results');
      }
    }
    case 'BRAVE': {
      if (!apiKey) throw new Error('API key is required for Brave search');
      const results = await braveSearch(searchQuery, apiKey);
      try {
        return JSON.parse(results.message) as SearchResult[];
      } catch (error) {
        console.error('Failed to process brave search results', error);
        throw new Error('Failed to process brave search results');
      }
    }
    default:
      throw new Error('Invalid or unsupperted search engine');
  }
}

export async function run(
  config: CONFIG,
  inputs: INPUTS
): Promise<OUTPUT> {
  const { question } = inputs;

  if (!question) {
    throw new Error('Question is required in inputs');

  }

  try {
    // Step 1: Generate optimized search query
    const searchQuery = await conversionToSearchQuery(question);
    // Step 2: Perform search with optimized query
    const sources: SmartSearchSource[] = []
    for (const preferred_source of searchQuery.preferred_sources) {
      switch (preferred_source) {
        case 'WIKIPEDIA':{
          const searchEngineQuery = searchQuery.search_query+' site:wikipedia.org';
          const searchEngine = config.searchEngine || 'DUCKDUCKGO';
          const sourcesSearchResults: SearchResult[] = await extractSourcesFromSearchEngine(searchEngineQuery, searchEngine, config.searchEngineApiKey);
          try {
            sources.push(...(sourcesSearchResults as SearchResult[]));
          } catch (error) {
            console.error('Failed to process brave search results', error);
            throw new Error('Failed to process brave search results');
          }
          break;
        }
        case 'WOLFRAMALPHA':
          throw new Error('WOLFRAMALPHA is not supported yet');
          //wolframAlphaSearch(searchQuery.search_query);
        case 'OTHER':
          // sources.push(searchQuery.search_query);
          break;
        default:
          throw new Error('Invalid source');
      }
    }
    const smartSearchSouces: SmartSearchSourcePage[] = []
    let id = 1;
    for (const source of sources) {
      if (typeof source === 'string') throw new Error('Invalid source');
      const searchResult = await shinkaiDownloadPages([source.url]);
      smartSearchSouces.push({
        id: id++, url: source.url, title: source.title,
        markdown: searchResult.markdowns.join('\n'),
      });
    }
    const statements: SmartSearchStatement[] = []
    // Step 3: Extract statements from sources
    for (const smartSearchSource of smartSearchSouces) {
      const statementString = await shinkaiLlmPromptProcessor('text', statementExtract(question, smartSearchSource));
      const cleanStatementString = statementString.message.replace(/^.*```json\n/g, '').replace(/\n```.*$/g, '');
      try { 
        const statement = JSON.parse(cleanStatementString) as SmartSearchStatement;
        statements.push(statement);
      } catch (error) {
        console.error('Failed to process statement', smartSearchSource.url, error);
        console.error(cleanStatementString)
        console.error(smartSearchSource)
        throw new Error('Failed to process statement');
      }
    }
    // clean markdown from sources for lighter input
    smartSearchSouces.forEach(source => delete source.markdown);
    const generationContext: SmartSearchGenerationContext = {
      originalQuestion: question,
      statements,
      sources: smartSearchSouces,
    }
    // Step 4: Generate answer
    const answerPrompt = answerGenerator(generationContext);
    const response = await shinkaiLlmPromptProcessor('text', answerPrompt);
    response.message = response.message.replace(/\s*```json\n/g, '').replace(/\n```/g, '');
    
    return {
      statements,
      sources: smartSearchSouces,
      response: response.message,
    };
  } catch (error) {
    throw new Error(ProcessQuestionError('question processing', new Error(String(error))));
  }
}

try {
  const question = prompt("Enter your question: ") || "Where do were windmills invented?";
  if (!question) {
    throw new Error("No question provided");
  }
  const program_result = await run({ searchEngine: 'BRAVE', searchEngineApiKey: Deno.env.get('BRAVE_API_KEY') }, { question });
  if (program_result) console.log(JSON.stringify(program_result, null, 2));
  else console.log(program_result);
} catch (e) {
  console.log('::ERROR::', e);
}
