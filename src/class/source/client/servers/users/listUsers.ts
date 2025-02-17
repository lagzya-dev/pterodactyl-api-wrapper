import ClientAPICall from "../../../../../functions/createAppCall";

export interface Response {
    object: string;
    data: Array<{
      object: string;
      attributes: {
        uuid: string;
        username: string;
        email: string;
        image: string;
        "2fa_enabled": boolean;
        created_at: string;
        permissions: string[];
      };
    }>;
  }
  

/**
 * Retrieves a list of all users assigned to a specific server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @returns {Promise<Response>} - API response containing the list of users.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listUsers(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/${options.server_id}/users`
    });
}
