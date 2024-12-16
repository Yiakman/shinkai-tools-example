
/**
 * Gets an array of mounted files.
 * @returns Promise<string[]> - Array of files.
 */
export async function getMountPaths(): Promise<string[]> {
    const mountPaths = Deno.env.get('SHINKAI_MOUNT');
    if (!mountPaths) return [];
    return mountPaths.split(',').map(path => path.trim());
}

/**
 * Gets an array of asset files. These files are read only.
 * @returns Promise<string[]> - Array of files.
 */
export async function getAssetPaths(): Promise<string[]> {
    const assetPaths = Deno.env.get('SHINKAI_ASSETS');
    if (!assetPaths) return [];
    return assetPaths.split(',').map(path => path.trim());
}

/**
 * Gets the home directory path. All created files must be written to this directory.
 * @returns Promise<string> - Home directory path.
 */
export async function getHomePath(): Promise<string> {
    return Deno.env.get('SHINKAI_HOME') || "";
}

/**
 * Gets the Shinkai Node location URL. This is the URL of the Shinkai Node server.
 * @returns Promise<string> - Shinkai Node URL.
 */
export async function getShinkaiNodeLocation(): Promise<string> {
    return Deno.env.get('SHINKAI_NODE_LOCATION') || "";
}

/**
 * Gets a valid OAuth AccessToken for the given provider.
 * @returns Promise<string> - OAuth access token.
 */
export async function getAccessToken(providerName: string): Promise<string> {
    const oauthConfig = JSON.parse(Deno.env.get('SHINKAI_OAUTH') || '{}');
    
    type ProviderConfig = {
        name: string,
        version: string,
        authorizationUrl: string,
        redirectUrl: string,
        tokenUrl: string,
        clientId: string,
        clientSecret: string,
        scopes: string[],
        grantType: string,
        refreshToken?: string,
        accessToken?: string,
    }
    const providerConfig: ProviderConfig = oauthConfig[providerName];
    
    if (!providerConfig) {
        throw new Error(`OAuth configuration not found for provider: ${providerName}`);
    }

    try {
        if (providerConfig.version === '1.0' || providerConfig.grantType === 'authorization_code') {
            return providerConfig.accessToken || '';
        }
        if (providerConfig.version === '2.0') {
            // Check if we have a refresh token
            const refreshToken = providerConfig.refreshToken
            if (!refreshToken) {
                throw new Error(`No refresh token found for provider: ${providerName}`);
            }

            // Make request to refresh token endpoint
            const response = await fetch(providerConfig.tokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    client_id: providerConfig.clientId,
                    client_secret: providerConfig.clientSecret,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to refresh token: ${response.statusText}`);
            }

            const data = await response.json();
            return data.access_token;
        }
        throw new Error(`Unsupported OAuth version for provider: ${providerName}`);
    } catch (error) {
        console.error('Error getting access token:', error);
        return '';
    }
}
