import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Retrieves a list of users from the Pterodactyl panel API, with optional filters and sorting.
 * This function makes a `GET` request and includes the request body if required.
 *
 * @param {Object} options - Configuration options for the API call.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {boolean} [options.showLinkedServers=false] - Whether to include linked servers in the response.
 * @param {Object} [options.filters] - Filters to apply when retrieving users.
 * @param {string} [options.filters.email] - Filter users by their email address.
 * @param {string} [options.filters.uuid] - Filter users by their UUID.
 * @param {string} [options.filters.username] - Filter users by their username.
 * @param {string} [options.filters.external_id] - Filter users by their external ID.
 * @param {Object} [options.sortBy] - Sorting preferences for the response.
 * @param {boolean} [options.sortBy.id=false] - Sort users by ID.
 * @param {boolean} [options.sortBy.uuid=false] - Sort users by UUID.
 * @returns {Promise<any>} - A Promise resolving to the API response.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */

export default async function listUsers(options: { 
    apiKey: string, 
    panel: string, 
    showLinkedServers?: boolean, 
    filters?: { 
        email?: string, 
        uuid?: string, 
        username?: string, 
        external_id?: string
    },
    sortBy?: {
        id?: boolean,
        uuid?: boolean
    }
}): Promise<any> {
    const body = {
        servers: options.showLinkedServers ?? false,
        filters: {
            email: options.filters?.email ?? null,
            uuid: options.filters?.uuid ?? null,
            username: options.filters?.username ?? null,
            external_id: options.filters?.external_id ?? null
        },
        sortBy: {
            id: options.sortBy?.id ?? false,
            uuid: options.sortBy?.uuid ?? false
        }
    };

    return ApplicationAPICall({
        panel: options.panel,
        apiKey: options.apiKey,
        endpoint: "users",
        method: "GET",
        body: JSON.stringify(body) 
    });
}
