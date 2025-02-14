import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Creates a new location on the Pterodactyl panel.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {Object} options.location_data - The data required to create a new location.
 * @param {string} options.location_data.short - A short identifier for the location (e.g., "us-east").
 * @param {string} options.location_data.long - A long description of the location (e.g., "US East Coast Datacenter").
 * @returns {Promise<any>} - API response containing the created location details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function createLocation(options: { 
    apiKey: string; 
    panel: string; 
    location_data: {
        short: string;
        long: string;
    };
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: "locations",
        body: JSON.stringify(options.location_data)
    });
}
