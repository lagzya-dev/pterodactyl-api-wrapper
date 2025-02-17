import ClientAPICall from "../../../../functions/createAppCall";

export interface Response {
    object: string,
    attributes: {
        identifier: string,
        description: string,
        allowed_ips: string[],
        last_used_at: null | string,
        created_at: string
    },
    meta: {
        secret_token: string
    }
}

/**
 * Creates a new API key for the authenticated user.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.description - A description for the API key.
 * @param {string[]} options.allowed_ips - An array of allowed IPs (empty for unrestricted access).
 * @returns {Promise<Response>} - API response containing the newly created API key.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function createApiKey(options: { 
    apiKey: string; 
    panel: string; 
    description: string;
    allowed_ips: string[];
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: "account/api-keys",
        body: {
            description: options.description,
            allowed_ips: options.allowed_ips
        }
    });
}
