import ApplicationAPICall from "../../../../../functions/createAppCall";

/**
 * Deletes an allocation from a specific node.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.node_id - The ID of the node where the allocation exists.
 * @param {number} options.allocation_id - The ID of the allocation to delete.
 * @returns {Promise<any>} - API response.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function deleteAllocation(options: { 
    apiKey: string; 
    panel: string; 
    node_id: number; 
    allocation_id: number; 
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "DELETE",
        endpoint: `nodes/${options.node_id}/allocations/${options.allocation_id}`
    });
}
