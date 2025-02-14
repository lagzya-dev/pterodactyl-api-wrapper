import ClientAPICall from "../../../../../functions/createAppCall";

/**
 * Creates a new database for a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.database_name - The name of the database.
 * @param {string} [options.remote] - The allowed remote IP (default `%` for all).
 * @returns {Promise<any>} - API response confirming database creation.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function createDatabase(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    database_name: string;
    remote?: string;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/databases`,
        body: JSON.stringify({
            database: options.database_name,
            remote: options.remote ?? "%"
        })
    });
}
