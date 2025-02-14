import ClientAPICall from "../../../../../functions/createAppCall";

/**
 * Updates an existing user's permissions for a specific server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.user_id - The ID of the user.
 * @param {string[]} options.permissions - The new set of permissions for the user.
 * @returns {Promise<any>} - API response confirming user update.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function updateUser(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    user_id: string;
    permissions: string[];
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "PUT",
        endpoint: `servers/${options.server_id}/users/${options.user_id}`,
        body: JSON.stringify({ permissions: options.permissions })
    });
}
