import ApplicationAPICall from "../../../../functions/createAppCall";
interface Response {
    object: string,
    data: {
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
            behind_proxy: string,
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
            updated_at: string
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
 * Retrieves a list of all nodes on the Pterodactyl panel.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @returns {Promise<Response>} - API response containing all nodes.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listNodes(options: { 
    apiKey: string; 
    panel: string; 
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: "nodes"
    });
}
