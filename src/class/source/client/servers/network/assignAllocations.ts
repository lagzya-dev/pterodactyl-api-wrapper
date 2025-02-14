import ClientAPICall from "../../../../../functions/createAppCall";

/**
 * Assigns a new allocation to a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {number} options.allocation_id - The ID of the allocation to assign.
 * @returns {Promise<any>} - API response confirming allocation assignment.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function assignAllocations(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    allocation_id: number;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/network/allocations`,
        body: JSON.stringify({ allocation_id: options.allocation_id })
    });
}
