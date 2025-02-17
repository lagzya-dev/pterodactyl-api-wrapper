import ClientAPICall from "../../../../../functions/createAppCall";

export interface Response {
    object: string;
    data: Array<{
      object: string;
      attributes: {
        id: number;
        ip: string;
        ip_alias: string | null;
        port: number;
        notes: string | null;
        is_default: boolean;
      };
    }>;
  }
  

/**
 * Retrieves a list of all network allocations for a specific server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @returns {Promise<Response>} - API response containing the list of allocations.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listAllocations(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/${options.server_id}/network/allocations`
    });
}
