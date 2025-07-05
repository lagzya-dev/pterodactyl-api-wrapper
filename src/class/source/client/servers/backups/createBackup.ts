import ClientAPICall from "../../../../../functions/createClientCall";

export interface Response {
    object: string;
    attributes: {
      uuid: string;
      name: string;
      ignored_files: string[];
      sha256_hash: string | null;
      bytes: number;
      created_at: string;
      completed_at: string | null;
    };
  }
  

/**
 * Creates a new backup for a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {Object} [options.backup_data] - Optional backup settings.
 * @param {string} [options.backup_data.name] - Name for the backup.
 * @param {boolean} [options.backup_data.locked] - Whether the backup is locked.
 * @returns {Promise<Response>} - API response confirming backup creation.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function createBackup(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    backup_data?: {
        name?: string;
        locked?: boolean;
    };
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/backups`,
        body: options.backup_data ? JSON.stringify(options.backup_data) : undefined
    });
}
