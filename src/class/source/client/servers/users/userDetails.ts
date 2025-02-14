import ClientAPICall from "../../../../../functions/createAppCall";

/**
 * Retrieves details of a specific user assigned to a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.user_id - The ID of the user.
 * @returns {Promise<any>} - API response containing user details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function userDetails(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    user_id: string;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/${options.server_id}/users/${options.user_id}`
    });
}
