import ClientAPICall from "../../../../../functions/createAppCall";

/**
 * Retrieves a list of all backups for a specific server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @returns {Promise<any>} - API response containing a list of backups.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listBackups(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/${options.server_id}/backups`
    });
}
