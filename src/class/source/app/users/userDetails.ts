import ApplicationAPICall from "../../../../functions/createAppCall";
interface Response {
    object: string,
    attributes: {
        id: number,
        external_id: string | null,
        uuid: string,
        username: string,
        email: string,
        first_name: string,
        last_name: string,
        language: string,
        root_admin: string,
        "2fa": boolean,
        created_at: string,
        updated_at: string
    }
}

/**
 * Retrieves details of a specific user from the Pterodactyl panel API.
 * Optionally, it can include the list of servers associated with the user.
 *
 * @param {Object} options - Configuration options for the API call.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.user_id - The unique ID of the user to retrieve.
 * @param {boolean} [options.listServers=false] - Whether to include the user's linked servers in the response.
 * @returns {Promise<Response>} - A Promise resolving to the API response.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function userDetails(options: { 
    apiKey: string, 
    panel: string, 
    user_id: string, 
    listServers?: boolean 
}): Promise<Response> {
    return ApplicationAPICall({
        panel: options.panel,
        apiKey: options.apiKey,
        endpoint: `user/${options.user_id}`,
        method: "GET",
        body: JSON.stringify({ servers: options.listServers ?? false }) // Ensuring body is a string
    });
}
