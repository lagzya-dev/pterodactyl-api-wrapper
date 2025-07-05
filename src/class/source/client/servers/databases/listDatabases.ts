import ClientAPICall from "../../../../../functions/createClientCall";

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
 * Retrieves a list of all databases associated with a specific server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @returns {Promise<Response>} - API response containing the list of databases.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listDatabases(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/${options.server_id}/databases`
    });
}
