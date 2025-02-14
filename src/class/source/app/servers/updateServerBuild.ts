import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Updates the build configuration of a server, including CPU, memory, disk, and other limits.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {Object} options.build_data - The new build configuration.
 * @param {number} [options.build_data.cpu] - The CPU limit (in percentage, 100% = 1 core).
 * @param {number} [options.build_data.memory] - The memory limit (in MB).
 * @param {number} [options.build_data.disk] - The disk space limit (in MB).
 * @param {number} [options.build_data.swap] - The swap memory limit (in MB).
 * @param {number} [options.build_data.io] - The block I/O weight (10-1000).
 * @param {number} [options.build_data.threads] - The CPU threads allowed for the server.
 * @param {boolean} [options.build_data.oom_disabled] - Whether to disable Out-of-Memory (OOM) killer.
 * @returns {Promise<any>} - API response confirming the build update.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function updateServerBuild(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    build_data: {
        cpu?: number;
        memory?: number;
        disk?: number;
        swap?: number;
        io?: number;
        threads?: number;
        oom_disabled?: boolean;
    };
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "PATCH",
        endpoint: `servers/${options.server_id}/build`,
        body: JSON.stringify(options.build_data)
    });
}
