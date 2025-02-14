import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Retrieves a list of all locations from the Pterodactyl panel.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @returns {Promise<any>} - API response containing all locations.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listLocations(options: { 
    apiKey: string; 
    panel: string; 
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: "locations"
    });
}
