import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Updates details of a specific server (name or description).
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {Object} options.update_data - The new server details.
 * @returns {Promise<any>} - API response confirming the update.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function updateDetails(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    update_data: any;
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "PATCH",
        endpoint: `servers/${options.server_id}/details`,
        body: JSON.stringify(options.update_data)
    });
}
