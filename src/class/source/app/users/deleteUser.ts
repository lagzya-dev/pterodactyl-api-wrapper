import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Deletes a user from the Pterodactyl panel using the given identifier.
 *
 * @param {Object} options - Configuration options for the API call.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.identifier - The unique identifier (ID) of the user to be deleted.
 * @returns {Promise<any>} - A Promise resolving to the API response.
 *
 * @throws {Error} - Throws an error if the API request fails.
 *
 * @example
 * (async () => {
 *     try {
 *         const response = await deleteUser({
 *             panel: "https://panel.example.com",
 *             apiKey: "your-api-key",
 *             identifier: 1234
 *         });
 *         console.log("User Deleted:", response);
 *     } catch (error) {
 *         console.error("Error deleting user:", error);
 *     }
 * })();
 */
export default async function deleteUser(options: { 
    apiKey: string; 
    panel: string; 
    identifier: number; 
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "DELETE",
        endpoint: `users/${options.identifier}`
    });
}
