import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Retrieves details of a specific user from the Pterodactyl panel API.
 * Optionally, it can include the list of servers associated with the user.
 *
 * @param {Object} options - Configuration options for the API call.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.user_id - The unique ID of the user to retrieve.
 * @param {boolean} [options.listServers=false] - Whether to include the user's linked servers in the response.
 * @returns {Promise<any>} - A Promise resolving to the API response.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function userDetails(options: { 
    apiKey: string, 
    panel: string, 
    user_id: string, 
    listServers?: boolean 
}): Promise<any> {
    return ApplicationAPICall({
        panel: options.panel,
        apiKey: options.apiKey,
        endpoint: `user/${options.user_id}`,
        method: "GET",
        body: JSON.stringify({ servers: options.listServers ?? false }) // Ensuring body is a string
    });
}
