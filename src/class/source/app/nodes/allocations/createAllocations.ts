import ApplicationAPICall from "../../../../../functions/createAppCall";

/**
 * Creates a new allocation on a specific node.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.node_id - The ID of the node where the allocation should be created.
 * @param {string} options.ip - The IP address to allocate.
 * @param {number[]} options.ports - An array of ports to allocate.
 * @returns {Promise<any>} - API response.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function createAllocation(options: { 
    apiKey: string; 
    panel: string; 
    node_id: number;
    ip: string;
    ports: number[];
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `nodes/${options.node_id}/allocations`,
        body: JSON.stringify({
            ip: options.ip,
            ports: options.ports
        })
    });
}
