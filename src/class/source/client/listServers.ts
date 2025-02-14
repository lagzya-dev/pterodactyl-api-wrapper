import ClientAPICall from "../../../functions/createAppCall";

/**
 * Retrieves a list of all servers the authenticated user has access to.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @returns {Promise<any>} - API response containing the list of servers.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listServers(options: { 
    apiKey: string; 
    panel: string; 
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: "servers"
    });
}
