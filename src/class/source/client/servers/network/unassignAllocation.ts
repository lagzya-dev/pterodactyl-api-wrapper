import ClientAPICall from "../../../../../functions/createClientCall";

/**
 * Unassigns a network allocation from a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {number} options.allocation_id - The ID of the allocation to remove.
 * @returns {Promise<any>} - API response confirming allocation removal.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function unassignAllocation(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    allocation_id: number;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "DELETE",
        endpoint: `servers/${options.server_id}/network/allocations/${options.allocation_id}`
    });
}
