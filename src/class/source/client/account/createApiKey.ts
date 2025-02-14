import ClientAPICall from "../../../../functions/createAppCall";

/**
 * Creates a new API key for the authenticated user.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.description - A description for the API key.
 * @param {string[]} options.allowed_ips - An array of allowed IPs (empty for unrestricted access).
 * @returns {Promise<any>} - API response containing the newly created API key.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function createApiKey(options: { 
    apiKey: string; 
    panel: string; 
    description: string;
    allowed_ips: string[];
}): Promise<any> {
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
