import ApplicationAPICall from "../../../../../functions/createAppCall";

/**
 * Retrieves a list of all eggs within a specific nest.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.nest_id - The ID of the nest.
 * @returns {Promise<any>} - API response containing the list of eggs.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listEggs(options: { 
    apiKey: string; 
    panel: string; 
    nest_id: number;
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `nests/${options.nest_id}/eggs`
    });
}
