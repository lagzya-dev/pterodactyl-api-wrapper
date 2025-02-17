import ApplicationAPICall from "../../../../functions/createAppCall";

interface Response {
    object: string,
    attributes: {
        id: number,
        short: string,
        long: string,
        updated_at: string,
        created_at: string
    }
}

/**
 * Updates an existing location on the Pterodactyl panel.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.location_id - The ID of the location to update.
 * @param {Object} options.update_data - The new data for updating the location.
 * @param {string} [options.update_data.short] - The new short identifier for the location (optional).
 * @param {string} [options.update_data.long] - The new long description of the location (optional).
 * @returns {Promise<Response>} - API response confirming the update.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function updateLocation(options: { 
    apiKey: string; 
    panel: string; 
    location_id: number; 
    update_data: {
        short?: string;
        long?: string;
    };
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "PATCH",
        endpoint: `locations/${options.location_id}`,
        body: JSON.stringify(options.update_data)
    });
}
