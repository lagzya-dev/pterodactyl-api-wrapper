import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Retrieves user details from the Pterodactyl panel API using an external identifier.
 * Optionally, it can include the list of servers associated with the user.
 *
 * @param {Object} options - Configuration options for the API call.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.external_id - The external identifier of the user to retrieve.
 * @param {boolean} [options.listServers=false] - Whether to include the user's linked servers in the response.
 * @returns {Promise<any>} - A Promise resolving to the API response.
 *
 * @throws {Error} - Throws an error if the API request fails.
 *
 * @example
 * (async () => {
 *     try {
 *         const userData = await userDetailsByExternalIdentifier({
 *             panel: "https://panel.example.com",
 *             apiKey: "your-api-key",
 *             external_id: "external-user-1234",
 *             listServers: true
 *         });
 *         console.log("User Details:", userData);
 *     } catch (error) {
 *         console.error("Error:", error);
 *     }
 * })();
 */
export default async function userDetailsByExternalIdentifier(options: { 
    apiKey: string, 
    panel: string, 
    external_id: string, 
    listServers?: boolean 
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `users/external/${options.external_id}`,
        body: JSON.stringify({ servers: options.listServers ?? false }) // Ensuring body is a JSON string
    });
}
