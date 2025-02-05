# Smart Search Tool

A sophisticated search and answer generation pipeline that combines multiple strategies to provide high-quality, well-cited answers to user questions.

## Pipeline Steps

1. **Query Optimization**
   - Takes the user's natural language question
   - Transforms it into an optimized search query
   - Determines the most appropriate sources (Wikipedia, WolframAlpha, etc.)
   - Ensures better search results by removing conversational elements

2. **Source Retrieval**
   - Uses Brave Search or DuckDuckGo API for Wikipedia content
   - Focuses on authoritative sources
   - Retrieves full page content for detailed analysis
   - TODO: Add other sources like Google, StackOverflow, etc.

3. **Content Processing**
   - For each retrieved source, downloads complete page content in markdown format
   - Maintains original formatting and structure

4. **Fact Extraction**
   - Systematically analyzes source content
   - Extracts relevant statements verbatim
   - Classifies statements by relevance to the question
   - Preserves original context and accuracy

5. **Answer Generation**
   - Synthesizes information from multiple sources
   - Creates comprehensive, well-structured answers
   - Includes precise citations for every claim
   - Generates relevant follow-up questions

```mermaid
graph TD;
    A[User Question] --> B[Query Optimization]
    B --> C[Source Retrieval]
    C --> D[Content Processing]
    D --> E[Fact Extraction]
    E --> F[Answer Generation]
```

## Strategy Rationale

This multi-step approach is designed to:
- Ensure high-quality, accurate information from reliable sources
- Maintain academic rigor through proper citation
- Provide comprehensive answers that go beyond surface-level explanations
- Create a learning experience through follow-up questions

## Type Definitions

### Core Types

```typescript
type CONFIG = Record<string, unknown>;
type INPUTS = {
  question: string;
};
type OUTPUT = SmartSearchGenerationContext & {
  response: string;
};
```

These core types define the tool's interface:
- `CONFIG`: Extensible configuration object for future parameters
- `INPUTS`: Simple interface requiring only the user's question
- `OUTPUT`: Combines the generation context with the final response string

### Domain Types

```typescript
type PREFERRED_SOURCES = 'WIKIPEDIA' | 'WOLFRAMALPHA' | 'OTHER';

type SearchQueryConversion = {
  origin_question: string;
  preferred_sources: PREFERRED_SOURCES[];
  search_query: string;
};

interface SmartSearchSourcePage {
  url: string;
  markdown: string;
  title: string;
};

interface SmartSearchStatement {
  sourceId: number;
  sourceTitle: string;
  extractedFacts: {
    statement: string;
    relevance: 'DIRECT_ANSWER' | 'HIGHLY_RELEVANT' | 
               'SOMEWHAT_RELEVANT' | 'TANGENTIAL' | 'NOT_RELEVANT';
  }[];
}

interface SmartSearchGenerationContext {
  originalQuestion: string;
  optimizedQuery: string;
  sources: SmartSearchSourcePage[];
};
```

#### Type Details

- `PREFERRED_SOURCES`: Enum of supported search sources
  - `WIKIPEDIA`: Primary source for factual information
  - `WOLFRAMALPHA`: For computational and scientific queries
  - `OTHER`: General web sources

- `SearchQueryConversion`: Structures the optimized search query
  - `origin_question`: Preserves the original user question
  - `preferred_sources`: Array of sources to query
  - `search_query`: Optimized search terms

- `SmartSearchSourcePage`: Represents a processed source document
  - `url`: Original source URL
  - `markdown`: Processed content in markdown format
  - `title`: Source document title

- `SmartSearchStatement`: Structures extracted facts
  - `sourceId`: Unique identifier for the source
  - `sourceTitle`: Title of the source document
  - `extractedFacts`: Array of statements with relevance classification

- `SmartSearchGenerationContext`: Complete context for answer generation
  - `originalQuestion`: User's initial question
  - `optimizedQuery`: Processed search query
  - `sources`: Array of processed source pages

## Usage Example

```typescript
// Basic usage
const result = await run({}, { 
  question: "Why is the sky blue?" 
});

console.log(result.response);

// The response includes:
// - Comprehensive answer with citations
// - Follow-up questions
// - List of sources used
```

## Development

To extend the tool's capabilities:
1. TODO: Split long source content into multiple pages to appropriate length in statement extraction
2. Add new source types to `PREFERRED_SOURCES`
3. Implement corresponding search functions
4. Update the query optimization prompt
5. Modify the answer generation template if needed
