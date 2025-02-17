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
 * Retrieves details of a specific location from the Pterodactyl panel.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.location_id - The ID of the location to retrieve.
 * @returns {Promise<Response>} - API response containing location details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function locationDetails(options: { 
    apiKey: string; 
    panel: string; 
    location_id: number; 
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `locations/${options.location_id}`
    });
}
