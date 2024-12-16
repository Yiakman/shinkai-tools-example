import { SmartSearchSourcePage } from "../tool.ts";

export const statementExtract = (originalQuestion: string, source: SmartSearchSourcePage): string => `

# Fact Extraction Instructions

## Input JSON Structure
\`\`\`json
{
  "originalQuestion": "string - The user's original question",
  "source": {
    "id": "number - Unique identifier for the source",
    "url": "string - URL of the source page",
    "title": "string - Title of the source page",
    "markdown": "string - Full text content of the source page"
  }
}
\`\`\`

## Output JSON Structure
\`\`\`json
{
  "sourceId": "number - ID of the source",
  "sourceTitle": "string - Title of the source",
  "extractedFacts": [
    {
      "statement": "string - Verbatim text from the source",
      "relevance": "string - One of ['DIRECT_ANSWER', 'HIGHLY_RELEVANT', 'SOMEWHAT_RELEVANT', 'TANGENTIAL', 'NOT_RELEVANT']"
    }
  ]
}
\`\`\`

## Relevance Classification Guide:
- \`DIRECT_ANSWER\`: 
  - Completely and precisely addresses the original question
  - Contains the core information needed to fully respond
  - Minimal to no additional context required

- \`HIGHLY_RELEVANT\`: 
  - Provides substantial information directly related to the question
  - Offers critical context or partial solution
  - Significantly contributes to understanding

- \`SOMEWHAT_RELEVANT\`: 
  - Provides partial or indirect information
  - Offers peripheral insights
  - Requires additional context to be fully meaningful

- \`TANGENTIAL\`: 
  - Loosely connected to the topic
  - Provides background or related information
  - Not directly addressing the core question

- \`NOT_RELEVANT\`: 
  - No meaningful connection to the original question
  - Completely unrelated information


  ## Extraction Guidelines:
  1. Read the entire source document carefully
  2. Extract EXACT quotes that:
     - Are actually helpful answering the provided question
     - Are stated verbatim from the source or are rephrased in such a way that doesn't distort the meaning in the original source
     - Represent complete thoughts or meaningful segments
  3. Classify each extracted fact with its relevance level
  4. Preserve original context and nuance

## Critical Rules:
- try NOT to paraphrase or modify the original text
- Avoid any text in the "statement" field that is not helpful answering the provided question like javascript, URLs, HTML, and other non-textual content
- Extract statements as they appear in the source and ONLY if they are helpful answering the provided question
- Include full sentences or meaningful text segments
- Preserve original formatting and punctuation
- Sort extracted facts by relevance (DIRECT_ANSWER first)
- Output JSON without \`\`\`json\`\`\` tags, or without any escape characters or any text that is not JSON or my system will crash.

## Processing Instructions:
- Analyze the entire document systematically
- Be comprehensive in fact extraction
- Err on the side of inclusion when in doubt
- Focus on factual, informative statements

==BEGIN INPUT==
Original Question: ${originalQuestion}

Source:
${JSON.stringify(source)}
==END INPUT==

`