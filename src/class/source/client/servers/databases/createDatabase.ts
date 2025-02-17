import ClientAPICall from "../../../../../functions/createAppCall";

export interface Response {
    object: string;
    attributes: {
      id: string;
      host: {
        address: string;
        port: number;
      };
      name: string;
      username: string;
      connections_from: string;
      max_connections: number;
      relationships: {
        password: {
          object: string;
          attributes: {
            password: string;
          };
        };
      };
    };
  }
  

/**
 * Creates a new database for a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.database_name - The name of the database.
 * @param {string} [options.remote] - The allowed remote IP (default `%` for all).
 * @returns {Promise<Response>} - API response confirming database creation.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function createDatabase(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    database_name: string;
    remote?: string;
}): Promise<Response> {
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
