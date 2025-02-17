import ApplicationAPICall from "../../../../../functions/createAppCall";

interface Response {
    object: string,
    attributes: {
        id: number,
        server: number,
        host: number,
        database: string,
        username: string,
        remote: string,
        max_connections: number | null,
        created_at: string,
        updated_at: string
    },
    meta: {
        resource: string
    }
}

/**
 * Creates a new database for a specific server.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server to create the database for.
 * @param {Object} options.database_data - The data for the new database.
 * @param {string} options.database_data.database - The name of the database.
 * @param {string} options.database_data.remote - The remote access setting (e.g., `%` for any IP).
 * @returns {Promise<Response>} - API response containing the created database details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function createDatabase(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    database_data: {
        database: string;
        remote: string;
    };
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/databases`,
        body: JSON.stringify(options.database_data)
    });
}
