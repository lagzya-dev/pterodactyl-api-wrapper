import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Creates a new server on the Pterodactyl panel.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {Object} options.server_data - The data required to create the server.
 * @returns {Promise<any>} - API response containing the created server details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function createServer(options: { 
    apiKey: string; 
    panel: string; 
    server_data: any;
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: "servers",
        body: JSON.stringify(options.server_data)
    });
}
