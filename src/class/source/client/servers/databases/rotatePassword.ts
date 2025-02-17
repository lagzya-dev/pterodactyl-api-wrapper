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
 * Rotates the password for a specific database.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.database_id - The ID of the database.
 * @returns {Promise<Response>} - API response confirming password rotation.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function rotatePassword(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    database_id: string;
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/databases/${options.database_id}/rotate-password`
    });
}
