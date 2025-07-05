import ClientAPICall from "../../../../../functions/createClientCall";

export interface Response {
    object: "server_subuser";
    attributes: {
      uuid: string;
      username: string;
      email: string;
      image: string;
      "2fa_enabled": boolean;
      created_at: string;
      permissions: string[];
    };
  }
  

/**
 * Assigns a new user to a server with specific permissions.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.email - The email address of the user.
 * @param {string} options.username - The username of the user.
 * @param {string[]} options.permissions - An array of permissions for the user.
 * @returns {Promise<Response>} - API response confirming user creation.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function createUser(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    email: string;
    username: string;
    permissions: string[];
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/users`,
        body: JSON.stringify({
            email: options.email,
            username: options.username,
            permissions: options.permissions
        })
    });
}
