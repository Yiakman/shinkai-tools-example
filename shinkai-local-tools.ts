
import axios from 'npm:axios';
// deno-lint-ignore no-explicit-any
const tryToParseError = (data: any) => { try { return JSON.stringify(data); } catch (_) { return data; } };
// deno-lint-ignore no-explicit-any
const manageAxiosError = (error: any) => {
    // axios error management
    let message = '::NETWORK_ERROR::';
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        message += ' ' + tryToParseError(error.response.data);
        message += ' ' + tryToParseError(error.response.status);
        message += ' ' + tryToParseError(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        message += ' ' + tryToParseError(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        message += ' ' + tryToParseError(error.message);
    }
    message += ' ' + tryToParseError(error.config);
    throw new Error(message);
};
/**
 * Fetches the balance of an Ethereum address in ETH using Uniswap.
 * @param address - (required) 
 * @returns {
 *   balance: string 
 * }
 */
export async function shinkaiWeb3EthUniswap(address: string): Promise<{
    balance: string;
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::shinkai_tool_web3_eth_uniswap:::shinkai__web3_eth_uniswap',
        tool_type: 'deno',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            address: address,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Fetches the price of a coin or token using Chainlink. It doesn't have many tokens.
 * @param symbol - (required) 
 * @returns {
 *   price: number 
 *   symbol: string 
 * }
 */
export async function shinkaiTokenPriceUsingChainlinkLimited(symbol: string): Promise<{
    price: number;
    symbol: string;
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::shinkai_tool_token_price:::shinkai__token_price_using_chainlink__limited_',
        tool_type: 'deno',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            symbol: symbol,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Fetches the balance of an Ethereum address in ETH.
 * @param address - (required) 
 * @returns {
 *   balance: string 
 * }
 */
export async function shinkaiWeb3EthBalance(address: string): Promise<{
    balance: string;
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::shinkai_tool_web3_eth_balance:::shinkai__web3_eth_balance',
        tool_type: 'deno',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            address: address,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Downloads one or more URLs and converts their HTML content to Markdown
 * @param urls - (required) 
 * @returns {
 *   markdowns: string[] 
 * }
 */
export async function shinkaiDownloadPages(urls: any[]): Promise<{
    markdowns: string[];
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::shinkai_tool_download_pages:::shinkai__download_pages',
        tool_type: 'deno',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            urls: urls,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Echoes the input message
 * @param message - (required) 
 * @returns {
 *   message: string 
 * }
 */
export async function shinkaiEcho(message: string): Promise<{
    message: string;
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::shinkai_tool_echo:::shinkai__echo',
        tool_type: 'deno',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            message: message,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Searches the DuckDuckGo search engine. Example result: [{"title": "IMDb Top 250 Movies", "description": "Find out which <b>movies</b> are rated as the <b>best</b> <b>of</b> <b>all</b> <b>time</b> by IMDb users. See the list of 250 titles sorted by ranking, genre, year, and rating, and learn how the list is determined.", "url": "https://www.imdb.com/chart/top/"}]
 * @param message - (required) 
 * @returns {
 *   message: string 
 * }
 */
export async function shinkaiDuckduckgoSearch(message: string): Promise<{
    message: string;
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::shinkai_tool_duckduckgo_search:::shinkai__duckduckgo_search',
        tool_type: 'deno',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            message: message,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Parses and evaluates mathematical expressions. It’s a safer and more math-oriented alternative to using JavaScript’s eval function for mathematical expressions.
 * @param expression - (required) 
 * @returns {
 *   result: string 
 * }
 */
export async function shinkaiMathExpressionEvaluator(expression: string): Promise<{
    result: string;
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::shinkai_tool_math_exp:::shinkai__math_expression_evaluator',
        tool_type: 'deno',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            expression: expression,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * New foobar tool from template
 * @param message - (required) 
 * @returns {
 *   message: string 
 * }
 */
export async function shinkaiFoobar(message: string): Promise<{
    message: string;
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::shinkai_tool_foobar:::shinkai__foobar',
        tool_type: 'deno',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            message: message,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Runs the Leiden algorithm on the input edges
 * @param convergenceThreshold - (optional) , default: undefined
 * @param edges - (required) 
 * @param nIterations - (optional) , default: undefined
 * @param nRandomStarts - (optional) , default: undefined
 * @param resolution - (optional) , default: undefined
 * @returns {
 *   bestClustering: object 
 *   bestLayout: object 
 * }
 */
export async function shinkaiLeidenAlgorithm(convergenceThreshold?: number, edges: any[], nIterations?: number, nRandomStarts?: number, resolution?: number): Promise<{
    bestClustering: object;
    bestLayout: object;
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::shinkai_tool_leiden:::shinkai__leiden_algorithm',
        tool_type: 'deno',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            convergenceThreshold: convergenceThreshold,
            edges: edges,
            nIterations: nIterations,
            nRandomStarts: nRandomStarts,
            resolution: resolution,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Fetches the balance for an Ethereum EVM address like 0x123... and returns detailed token information. Example output: { "address": "0x123...", "ETH": { "balance": 1.23, "rawBalance": "12300000000000000000" }, "tokens": [ { "balance": 100, "rawBalance": "100000000000000000000", "tokenInfo": { "name": "TokenName", "symbol": "TKN", "decimals": "18" } } ] }
 * @param address - (required) 
 * @returns {
 *   ETH: object 
 *   address: string 
 *   tokens: object[] 
 * }
 */
export async function tokenBalanceForEvmEthereumAddressBasedOnEthplorer(address: string): Promise<{
    ETH: object;
    address: string;
    tokens: object[];
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::shinkai_tool_ethplorer_tokens:::token_balance_for_evm_ethereum_address___based_on_ethplorer',
        tool_type: 'deno',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            address: address,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Echoes the input message
 * @param message - (required) 
 * @returns {
 * }
 */
export async function networkEcho(message: string): Promise<{
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: '@@agent_provider_arb_sep_shinkai:::shinkai_tool_echo:::network__echo',
        tool_type: 'network',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            message: message,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Takes a YouTube link and summarizes the content by creating multiple sections with a summary and a timestamp.
 * @param url - (required, The URL of the YouTube video) 
 * @returns {
 * }
 */
export async function youtubeTranscriptWithTimestamps(url: string): Promise<{
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: '@@agent_provider_arb_sep_shinkai:::shinkai_tool_youtube_transcript:::youtube_transcript_with_timestamps',
        tool_type: 'network',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            url: url,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Tool for processing any prompt using an AI LLM. 
Analyzing the input prompt and returning a string with the result of the prompt.
This can be used to process complex requests, text analysis, text matching, text generation, and any other AI LLM task.
 * @param format - (required, The output format. Only 'text' is supported) 
 * @param prompt - (required, The prompt to process) 
 * @returns {
 *   message: string 
 * }
 */
export async function shinkaiLlmPromptProcessor(format: string, prompt: string): Promise<{
    message: string;
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::rust_toolkit:::shinkai_llm_prompt_processor',
        tool_type: 'rust',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            format: format,
            prompt: prompt,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Tool for executing a single SQL query on a specified database file. 
If this tool is used, you need to create if not exists the tables used other queries.
Table creation should always use 'CREATE TABLE IF NOT EXISTS'.

-- Example table creation:
CREATE TABLE IF NOT EXISTS table_name (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    field_1 TEXT NOT NULL,
    field_2 DATETIME DEFAULT CURRENT_TIMESTAMP,
    field_3 INTEGER,
    field_4 TEXT
);

-- Example insert:
INSERT INTO table_name (field_1, field_3, field_4) 
    VALUES ('value_1', 3, 'value_4')
    ON CONFLICT(id) DO UPDATE SET field_1 = 'value_1', field_3 = 3, field_4 = 'value_4';
;

-- Example read:
SELECT * FROM table_name WHERE field_2 > datetime('now', '-1 day');
SELECT field_1, field_3 FROM table_name WHERE field_3 > 100 ORDER BY field_2 DESC LIMIT 10;
 * @param database_name - (required, Database name. Use 'default' to use default database) 
 * @param query - (required, The SQL query to execute) 
 * @param query_params - (optional, The parameters to bind to the query) , default: undefined
 * @returns {
 *   result: any 
 *   rowCount: number 
 *   rowsAffected: number 
 *   type: string 
 * }
 */
export async function shinkaiSqliteQueryExecutor(database_name: string, query: string, query_params?: any[]): Promise<{
    result: any;
    rowCount: number;
    rowsAffected: number;
    type: string;
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::rust_toolkit:::shinkai_sqlite_query_executor',
        tool_type: 'rust',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            database_name: database_name,
            query: query,
            query_params: query_params,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Tool for processing embeddings within a job scope. 
This tool processes resources and generates embeddings using a specified mapping function.

Example usage:
- Provide a custom mapping function to transform resource content.
- Process resources in chunks to optimize performance.
- Collect and join processed embeddings for further analysis.
 * @param map_function - (optional, A function to map over resource content) , default: undefined
 * @returns {
 *   result: string 
 *   rowCount: number 
 *   rowsAffected: number 
 *   type: string 
 * }
 */
export async function shinkaiProcessEmbeddings(map_function?: string): Promise<{
    result: string;
    rowCount: number;
    rowsAffected: number;
    type: string;
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::rust_toolkit:::shinkai_process_embeddings',
        tool_type: 'rust',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            map_function: map_function,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Downloads the HTML content of a given URL
 * @param url - (required) 
 * @returns {
 * }
 */
export async function benchmarkDownloadWebsite(url: string): Promise<{
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::benchmark_download_website_test_engine:::benchmark_download_website',
        tool_type: 'deno',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            url: url,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Fetches the content of a website and stores it in an SQLite database, updating if already present.
 * @param url - (required) 
 * @returns {
 * }
 */
export async function benchmarkStoreWebsite(url: string): Promise<{
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::benchmark_store_website_test_engine:::benchmark_store_website',
        tool_type: 'deno',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            url: url,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

/**
 * Generates a summary of website content stored in a SQLite database using an AI LLM.
 * @param url - (required) 
 * @returns {
 * }
 */
export async function benchmarkSummarizeWebsite(url: string): Promise<{
}> {

    const _url = `${Deno.env.get('SHINKAI_NODE_LOCATION')}/v2/tool_execution`;
    const data = {
        tool_router_key: 'local:::benchmark_summarize_website_test_engine:::benchmark_summarize_website',
        tool_type: 'deno',
        llm_provider: `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`,
        parameters: {
            url: url,

        },
    };
    try {
        const response = await axios.post(_url, data, {
            headers: {
                'Authorization': `Bearer ${Deno.env.get('BEARER')}`,
                'x-shinkai-tool-id': `${Deno.env.get('X_SHINKAI_TOOL_ID')}`,
                'x-shinkai-app-id': `${Deno.env.get('X_SHINKAI_APP_ID')}`,
                'x-shinkai-llm-provider': `${Deno.env.get('X_SHINKAI_LLM_PROVIDER')}`
            }
        });
        return response.data;
    } catch (error) {
        return manageAxiosError(error);
    }
}

