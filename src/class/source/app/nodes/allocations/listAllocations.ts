import ApplicationAPICall from "../../../../../functions/createAppCall";

export interface Response {
    object: string,
    data: {
        object: string,
        attributes: {
            id: number,
            ip: string,
            alias: any,
            port: number,
            notes: any,
            assigned: boolean
        }
    }[],
    meta: {
        pagination: {
            total: number,
            count: number,
            per_page: number,
            current_page: number,
            total_pages: number,
            links: object
        }
    }
}

/**
 * Retrieves a list of all allocations on a specific node.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.node_id - The ID of the node whose allocations should be retrieved.
 * @returns {Promise<Response>} - API response containing the list of allocations.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listAllocations(options: { 
    apiKey: string; 
    panel: string; 
    node_id: number; 
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `nodes/${options.node_id}/allocations`
    });
}
