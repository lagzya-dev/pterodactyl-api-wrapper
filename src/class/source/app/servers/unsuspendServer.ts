import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Unsuspends a server, allowing it to start again.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server to unsuspend.
 * @returns {Promise<any>} - API response confirming the unsuspension.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function unsuspendServer(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/unsuspend`
    });
}
