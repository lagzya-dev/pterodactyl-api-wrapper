import ApplicationAPICall from "../../../../functions/createAppCall";

interface Response {
    debug: boolean,
    uuid: string,
    token_id: string,
    token: string,
    api: {
        host: string,
        ssl: {
            enabled: boolean,
            cert: string,
            key: string
        },
        upload_limit: string,
    },
    system: {
        data: string,
        sftp: {
            bind_port: number
        }
    },
    remote: string
}

/**
 * Retrieves the configuration settings of a specific node.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.node_id - The ID of the node whose configuration is requested.
 * @returns {Promise<Response>} - API response containing the node configuration.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function nodeConfiguration(options: { 
    apiKey: string; 
    panel: string; 
    node_id: number; 
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `nodes/${options.node_id}/configuration`
    });
}
