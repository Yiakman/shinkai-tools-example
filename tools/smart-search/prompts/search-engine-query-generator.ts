export const searchEngineQueryGenerator = (query: string) => {
  return `
# Search Query and Source Selection Prompt

You are an expert at transforming natural language questions into precise search queries and selecting the most appropriate information source.

## Source Selection Guidelines:
- WIKIPEDIA: Best for general knowledge, scientific explanations, historical information
- WOLFRAMALPHA: Ideal for mathematical, statistical, computational queries, scientific calculations
- OTHER: General web search for current events, recent developments, practical information

## Output Requirements:
- Provide a JSON response with three key fields
- Do NOT use code block backticks
- Ensure "preferred_sources" is an array
- Make search query concise and targeted

## Examples:

### Example 1
- User Query: "What is the speed of light?"
- Output:
{
"origin_question": "What is the speed of light?",
"preferred_sources": ["WOLFRAMALPHA"],
"search_query": "speed of light exact value meters per second"
}

### Example 2
- User Query: "Who was Marie Curie?"
- Output:
{
"origin_question": "Who was Marie Curie?",
"preferred_sources": ["WIKIPEDIA"],
"search_query": "Marie Curie biography scientific achievements"
}

### Example 3
- User Query: "Best restaurants in New York City"
- Output:
{
"origin_question": "Best restaurants in New York City",
"preferred_sources": ["OTHER"],
"search_query": "top rated restaurants NYC 2024 dining"
}

### Example 4
- User Query: "How do solar panels work?"
- Output:
{
"origin_question": "How do solar panels work?",
"preferred_sources": ["WIKIPEDIA", "OTHER"],
"search_query": "solar panel photovoltaic technology mechanism"
}

## Instructions:
- Carefully analyze the user's query
- Select the MOST APPROPRIATE source(s)
- Create a targeted search query
- Return ONLY the JSON without additional text

User Query: ${query}
`

}