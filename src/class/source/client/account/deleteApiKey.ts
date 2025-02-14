import ClientAPICall from "../../../../functions/createAppCall";

/**
 * Deletes an API key for the authenticated user.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.key_id - The unique identifier of the API key to delete.
 * @returns {Promise<any>} - API response confirming deletion.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function deleteApiKey(options: { 
    apiKey: string; 
    panel: string; 
    key_id: string;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "DELETE",
        endpoint: `account/api-keys/${options.key_id}`
    });
}
