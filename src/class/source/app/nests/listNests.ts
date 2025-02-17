import ApplicationAPICall from "../../../../functions/createAppCall";

interface Response {
    object: string,
    data: {
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
    }[],
    meta: {
        pagination: number,
        count: number,
        per_page: number,
        current_page: number,
        total_pages: number,
        links: object
    }
}
/**
 * Retrieves a list of all nests available on the Pterodactyl panel.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @returns {Promise<Response>} - API response containing the list of nests.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listNests(options: { 
    apiKey: string; 
    panel: string; 
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: "nests"
    });
}
