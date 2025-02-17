import ApplicationAPICall from "../../../../../functions/createAppCall";

export interface Response {
    object: string,
    attributes: {
        id: number,
        server: number,
        host: number,
        database: string,
        username: string,
        remote: string,
        max_connections: number,
        created_at: string,
        updated_at: string
    }
}
/**
 * Retrieves details of a specific database.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {number} options.database_id - The ID of the database.
 * @returns {Promise<Response>} - API response containing database details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function databaseDetails(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    database_id: number;
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/${options.server_id}/databases/${options.database_id}`
    });
}
