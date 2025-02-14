import ClientAPICall from "../../../../../functions/createAppCall";

/**
 * Retrieves details of a specific backup for a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.backup_id - The ID of the backup.
 * @returns {Promise<any>} - API response containing backup details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function backupDetails(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    backup_id: string;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/${options.server_id}/backups/${options.backup_id}`
    });
}
