import ApplicationAPICall from "../../../../functions/createAppCall";

interface Response {
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
        pack: boolean,
        container: {
            startup_commands: string,
            image: string,
            installed: boolean,
            environment: object
        }
        updated_at: number,
        created_at: number
    }
}

/**
 * Retrieves details of a specific server using an external identifier.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.external_id - The external identifier of the server.
 * @returns {Promise<Response>} - API response containing server details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function serverDetailsExternalIdentifier(options: { 
    apiKey: string; 
    panel: string; 
    external_id: string;
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/external/${options.external_id}`
    });
}
