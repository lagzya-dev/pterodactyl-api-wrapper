import ApplicationAPICall from "../../../../functions/createAppCall";

interface Response {
    object: string,
    data: {
        object: string,
        attributes: {
            id: number,
            external_id: string,
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
                threads: null | number[]
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
            pack: any,
            container: {
                startup_command: string,
                image: string,
                installed: boolean,
                environment: object
            },
            updated_at: string,
            created_at: string,
            relationship: {
                databases: {
                    object: string,
                    data: {
                        object: string,
                        attributes: {
                            id: number,
                            server: number,
                            host: number, 
                            database: string,
                            username: string,
                            remote: string,
                            max_connections: number,
                            created_at: string,
                            updated_at: string
                        }
                    }[]
                }[]
            }
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
 * Retrieves a list of all servers from the Pterodactyl panel.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @returns {Promise<Response>} - API response containing the list of servers.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listServers(options: { 
    apiKey: string; 
    panel: string; 
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: "servers"
    });
}
