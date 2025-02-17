import ApplicationAPICall from "../../../../functions/createAppCall";

export interface Response {
    object: string,
    attributes: {
        id: number,
        uuid: string,
        public: boolean,
        name: string,
        description: null | string,
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
        allocated_resources: {
            memory: number,
            disk: number
        }
    },
    meta: {
        resource: string
    }
}

/**
 * Creates a new node on the Pterodactyl panel.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {Object} options.node_data - Node details for creation.
 * @param {string} options.node_data.name - The name of the node.
 * @param {string} [options.node_data.description] - Optional description of the node.
 * @param {number} options.node_data.location_id - The ID of the location where the node should be created.
 * @param {string} options.node_data.fqdn - The fully qualified domain name of the node.
 * @param {"http" | "https"} options.node_data.scheme - The scheme (HTTP or HTTPS) for the node.
 * @param {number} options.node_data.memory - The amount of memory allocated to the node (in MB).
 * @param {number} options.node_data.disk - The amount of disk space allocated to the node (in MB).
 * @param {number[]} [options.node_data.ports] - Optional list of ports assigned to the node.
 * @param {number} options.node_data.daemon_sftp - The SFTP port of the node.
 * @param {number} options.node_data.daemon_listen - The daemon listen port of the node.
 * @returns {Promise<Response>} - API response.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function createNode(options: { 
    apiKey: string; 
    panel: string; 
    node_data: {
        name: string;
        description?: string;
        location_id: number;
        fqdn: string;
        scheme: "http" | "https";
        memory: number;
        disk: number;
        ports?: number[];
        daemon_sftp: number;
        daemon_listen: number;
    };
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: "nodes",
        body: JSON.stringify(options.node_data)
    });
}
