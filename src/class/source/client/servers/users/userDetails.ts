import ClientAPICall from "../../../../../functions/createAppCall";

export interface Response {
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
  }

  
/**
 * Retrieves details of a specific user assigned to a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.user_id - The ID of the user.
 * @returns {Promise<Response>} - API response containing user details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function userDetails(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    user_id: string;
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/${options.server_id}/users/${options.user_id}`
    });
}
