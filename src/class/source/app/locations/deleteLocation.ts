import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Deletes a location from the Pterodactyl panel.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.location_id - The ID of the location to delete.
 * @returns {Promise<any>} - API response confirming the deletion.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function deleteLocation(options: { 
    apiKey: string; 
    panel: string; 
    location_id: number; 
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "DELETE",
        endpoint: `locations/${options.location_id}`
    });
}
