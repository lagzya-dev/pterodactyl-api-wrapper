import ApplicationAPICall from "../../../../functions/createAppCall";

export interface Response {
    object: string,
    attributes: {
        id: number,
        external_id: null | string | number,
        uuid: string,
        identifier: string,
        name: string,
        description: string,
        suspended: boolean,
        limits: {
            memory: number,
            swap: number,
            disk: number,
            io: number,
            cpu: number,
            threads: null | number[],
        },
        feature_limits: {
            databases: number,
            allocations: number,
            backups: number
        },
        user: number,
        node: number,
        allocation: number,
        nest: number,
        egg: number,
        container: {
            startup_command: string,
            image: string,
            installed: boolean,
            environment: object
        },
        updated_at: string,
        created_at: string
    }
}

/**
 * Creates a new server on the Pterodactyl panel.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {Object} options.server_data - The data required to create the server.
 * @returns {Promise<Response>} - API response containing the created server details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function createServer(options: { 
    apiKey: string; 
    panel: string; 
    server_data: any;
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: "servers",
        body: JSON.stringify(options.server_data)
    });
}
