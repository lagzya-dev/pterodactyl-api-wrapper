import ClientAPICall from "../../../../../functions/createClientCall";

/**
 * Renames a file or folder on a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {Object[]} options.files - An array of objects containing old and new file names.
 * @returns {Promise<any>} - API response confirming file/folder rename.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function renameFile(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    files: { from: string; to: string }[];
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "PUT",
        endpoint: `servers/${options.server_id}/files/rename`,
        body: JSON.stringify({ files: options.files })
    });
}
