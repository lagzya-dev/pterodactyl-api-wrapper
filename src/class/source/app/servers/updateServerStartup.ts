import ApplicationAPICall from "../../../../functions/createAppCall";

interface Response {
    object: string,
    attributes: {
        id: number,
        external_id: string,
        uuid: string,
        identifier: string,
        name: string,
        descriptions: string,
        suspendes: boolean,
        limits: {
            memory: number,
            swap: number,
            disk: number,
            io: number,
            cpu: number,
            threads: number[] | null
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
            environment: [],
        },
        updated_at: string,
        created_at: string
    }
}


/**
 * Updates the startup configuration of a server, including environment variables and startup command.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {Object} options.startup_data - The new startup configuration.
 * @param {string} [options.startup_data.startup] - The new startup command.
 * @param {number} [options.startup_data.egg] - The new egg ID for the server.
 * @param {number} [options.startup_data.image] - The new Docker image for the server.
 * @param {Object} [options.startup_data.environment] - The environment variables for the server.
 * @returns {Promise<Response>} - API response confirming the startup update.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function updateServerStartup(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    startup_data: {
        startup?: string;
        egg?: number;
        image?: string;
        environment?: Record<string, string>;
    };
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "PATCH",
        endpoint: `servers/${options.server_id}/startup`,
        body: JSON.stringify(options.startup_data)
    });
}
