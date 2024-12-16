// These environment variables are required, before any import.
// Do not remove them, as they set environment variables for the Shinkai Tools.
Deno.env.set('SHINKAI_NODE_LOCATION', "http://localhost:9950");
Deno.env.set('BEARER', "debug");
Deno.env.set('X_SHINKAI_TOOL_ID', "tool-id-debug");
Deno.env.set('X_SHINKAI_APP_ID', "tool-app-debug");
Deno.env.set('X_SHINKAI_LLM_PROVIDER', "o_qwen2_5_coder_32b");
Deno.env.set('SHINKAI_HOME', "results/typescript/typescript-00001-benchmark-oauth-github/qwen2-5-coder-32b/editor/home");
Deno.env.set('SHINKAI_MOUNT', "results/typescript/typescript-00001-benchmark-oauth-github/qwen2-5-coder-32b/editor/mount");
Deno.env.set('SHINKAI_ASSETS', "results/typescript/typescript-00001-benchmark-oauth-github/qwen2-5-coder-32b/editor/assets");
Deno.env.set('SHINKAI_OAUTH', JSON.stringify([])); // This gets filled by the node in runtime.

///// START CODE /////

import { getAccessToken } from './shinkai-local-support.ts';

type CONFIG = Record<string, unknown>;
type INPUTS = Record<string, unknown>;
type OUTPUT = Record<string, unknown>;

const FetchUserProfileError = (statusText: string): string => 
  `Failed to fetch user profile: ${statusText}`;

// deno-lint-ignore no-unused-vars
export async function run(config: CONFIG, inputs: INPUTS): Promise<OUTPUT> {
  const accessToken = await getAccessToken('github');
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(FetchUserProfileError(response.statusText));
  }
  
  const userProfile = await response.json();
  return { userProfile };
}

///// END CODE /////

// console.log('Running...')
// console.log('Config: {}')
// console.log('Inputs: {}')

try {
  const program_result = await run({}, {});
  if (program_result) console.log(JSON.stringify(program_result, null, 2));
  else console.log(program_result);
} catch (e) {
  console.log('::ERROR::', e);
}

