import ClientAPICall from "../../../../../functions/createAppCall";

/**
 * Copies a file to a new location on the server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.file_path - The path of the file to copy.
 * @returns {Promise<any>} - API response confirming the file copy.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function copyFile(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    file_path: string;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/files/copy`,
        body: JSON.stringify({ location: options.file_path })
    });
}
