import ApplicationAPICall from "../../../../../functions/createAppCall";

/**
 * Retrieves details of a specific egg from a nest.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.nest_id - The ID of the nest.
 * @param {number} options.egg_id - The ID of the egg to retrieve.
 * @returns {Promise<any>} - API response containing egg details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function eggDetails(options: { 
    apiKey: string; 
    panel: string; 
    nest_id: number;
    egg_id: number;
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `nests/${options.nest_id}/eggs/${options.egg_id}`
    });
}
