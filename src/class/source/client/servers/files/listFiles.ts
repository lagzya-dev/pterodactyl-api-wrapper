import ClientAPICall from "../../../../../functions/createAppCall";

/**
 * Retrieves a list of all files and directories for a specific server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} [options.directory] - The directory path to list files from (optional).
 * @returns {Promise<any>} - API response containing the list of files.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listFiles(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    directory?: string;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/${options.server_id}/files/list${options.directory ? `?directory=${options.directory}` : ""}`
    });
}
