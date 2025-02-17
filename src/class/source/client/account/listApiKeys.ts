import ClientAPICall from "../../../../functions/createAppCall";

interface Response {
    object: string,
    data: {
        object: string,
        attributes: {
            identifier: string,
            description: string,
            allowed_ips: [] | string[],
            last_used_at: string,
            created_at: string
        }
    }[]
}

/**
 * Retrieves a list of all API keys for the authenticated user.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @returns {Promise<Response>} - API response containing all API keys.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listApiKeys(options: { 
    apiKey: string; 
    panel: string; 
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: "account/api-keys"
    });
}
