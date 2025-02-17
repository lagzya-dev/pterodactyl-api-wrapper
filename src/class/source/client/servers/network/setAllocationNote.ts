import ClientAPICall from "../../../../../functions/createAppCall";

export interface Response {
    object: string;
    attributes: {
      id: number;
      ip: string;
      ip_alias: string | null;
      port: number;
      notes: string | null;
      is_default: boolean;
    };
  }

  
/**
 * Updates the note for a specific allocation on a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {number} options.allocation_id - The ID of the allocation to update.
 * @param {string} options.note - The new note for the allocation.
 * @returns {Promise<Response>} - API response confirming the note update.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function setAllocationNote(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    allocation_id: number;
    note: string;
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "PUT",
        endpoint: `servers/${options.server_id}/network/allocations/${options.allocation_id}`,
        body: JSON.stringify({ notes: options.note })
    });
}
