import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Suspends a server, preventing it from starting.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server to suspend.
 * @returns {Promise<any>} - API response confirming the suspension.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function suspendServer(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/suspend`
    });
}
