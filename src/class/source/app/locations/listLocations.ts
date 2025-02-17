import ApplicationAPICall from "../../../../functions/createAppCall";

export interface Response {
    object: string;
    data: {
      object: string;
      attributes: {
        id: number;
        short: string;
        long: string;
        updated_at: string;
        created_at: string;
      };
    }[];
    meta: {
      pagination: {
        total: number;
        count: number;
        per_page: number;
        current_page: number;
        total_pages: number;
        links: object;
      };
    };
  }
  

/**
 * Retrieves a list of all locations from the Pterodactyl panel.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @returns {Promise<Response>} - API response containing all locations.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listLocations(options: { 
    apiKey: string; 
    panel: string; 
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: "locations"
    });
}
