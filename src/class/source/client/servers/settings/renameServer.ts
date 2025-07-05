import ClientAPICall from "../../../../../functions/createClientCall";

/**
 * Renames a server on the panel.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.new_name - The new name for the server.
 * @returns {Promise<any>} - API response confirming the server rename.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function renameServer(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    new_name: string;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "PATCH",
        endpoint: `servers/${options.server_id}/settings/rename`,
        body: JSON.stringify({ name: options.new_name })
    });
}
