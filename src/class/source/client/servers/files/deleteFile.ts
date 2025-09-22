import ClientAPICall from "../../../../../functions/createClientCall";

/**
 * Deletes a file or folder on a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string[]} options.files - An array of files or folders to delete.
 * @returns {Promise<any>} - API response confirming file deletion.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function deleteFile(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    files: string[];
    root: string;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/files/delete`,
        body: { root: options.root, files: options.files }
    });
}
