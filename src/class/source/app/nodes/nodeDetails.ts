import ApplicationAPICall from "../../../../functions/createAppCall";

export interface Response {
    object: string,
    attributes: {
        id: number,
        uuid: string,
        public: boolean,
        name: string,
        description: string,
        location_id: number,
        fqdn: string,
        scheme: string,
        behind_proxy: boolean,
        maintenance_mode: boolean,
        memory: number,
        memory_overallocate: number,
        disk: number,
        disk_overallocate: number,
        upload_size: number,
        daemon_listen: number,
        daemon_base: string,
        created_at: string,
        updated_at: string
    }
}

/**
 * Retrieves details of a specific node.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.node_id - The ID of the node whose details are requested.
 * @returns {Promise<Response>} - API response containing node details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function nodeDetails(options: { 
    apiKey: string; 
    panel: string; 
    node_id: number; 
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `nodes/${options.node_id}`
    });
}
