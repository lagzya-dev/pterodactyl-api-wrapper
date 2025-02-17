import ApplicationAPICall from "../../../../../functions/createAppCall";

interface Response {
    object: string,
    data: {
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
            updated_at: string,
            relationships: {
                password: {
                    object: string,
                    attributes: {
                        password: string
                    }
                }
                host: {
                    object: string,
                    attributes: {
                        id: number,
                        name: string,
                        host: string,
                        port: number,
                        username: string,
                        node: number,
                        created_at: string,
                        updated_at: string
                    }
                }
            }
        }
    }[]
}

/**
 * Retrieves a list of all databases for a specific server.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @returns {Promise<Response>} - API response containing all databases.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listDatabases(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/${options.server_id}/databases`
    });
}
