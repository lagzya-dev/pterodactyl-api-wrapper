import ClientAPICall from "../../../../../functions/createClientCall";

/**
 * Creates a new folder on a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.folder_path - The path of the folder to create.
 * @returns {Promise<any>} - API response confirming folder creation.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function createFolder(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    folder_path: string;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/files/create-folder`,
        body: JSON.stringify({ name: options.folder_path })
    });
}
