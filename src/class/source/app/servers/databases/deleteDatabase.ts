import ApplicationAPICall from "../../../../../functions/createAppCall";

/**
 * Deletes a database from a server.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {number} options.database_id - The ID of the database to delete.
 * @returns {Promise<any>} - API response confirming the deletion.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function deleteDatabase(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    database_id: number;
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "DELETE",
        endpoint: `servers/${options.server_id}/databases/${options.database_id}`
    });
}
