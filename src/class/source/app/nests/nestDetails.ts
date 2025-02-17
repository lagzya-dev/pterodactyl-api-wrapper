import ApplicationAPICall from "../../../../functions/createAppCall";

export interface Response {
    object: string,
    attributes: {
        id: number,
        uuid: string,
        author: string,
        name: string,
        description: string,
        created_at: string,
        updated_at: string
    }
}
/**
 * Retrieves details of a specific nest.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.nest_id - The ID of the nest.
 * @returns {Promise<Response>} - API response containing nest details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function nestDetails(options: { 
    apiKey: string; 
    panel: string; 
    nest_id: number;
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `nests/${options.nest_id}`
    });
}
