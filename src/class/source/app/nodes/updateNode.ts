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
        daemon_sftp: number,
        daemon_base: string,
        created_at: string,
        updated_at: string,
        mounts: [],
        allocated_resources: {
            memory: number,
            disk: number
        }
    }
}

/**
 * Updates an existing node with new settings.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.node_id - The ID of the node to update.
 * @param {Object} options.update_data - The new data for the node update.
 * @param {string} [options.update_data.name] - The new name for the node (optional).
 * @param {string} [options.update_data.description] - The new description for the node (optional).
 * @param {number} [options.update_data.location_id] - The new location ID for the node (optional).
 * @param {number} [options.update_data.memory] - The new memory allocation for the node (optional, in MB).
 * @param {number} [options.update_data.disk] - The new disk allocation for the node (optional, in MB).
 * @param {number} [options.update_data.daemon_sftp] - The new SFTP port for the node (optional).
 * @param {number} [options.update_data.daemon_listen] - The new daemon listen port for the node (optional).
 * @returns {Promise<Response>} - API response.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function updateNode(options: { 
    apiKey: string; 
    panel: string; 
    node_id: number; 
    update_data: {
        name?: string;
        description?: string;
        location_id?: number;
        memory?: number;
        disk?: number;
        daemon_sftp?: number;
        daemon_listen?: number;
    };
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "PATCH",
        endpoint: `nodes/${options.node_id}`,
        body: JSON.stringify(options.update_data)
    });
}
