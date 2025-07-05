import ClientAPICall from "../../../functions/createClientCall";

export interface Response {
    object: string;
    data: Array<{
      object: string;
      attributes: {
        server_owner: boolean;
        identifier: string;
        uuid: string;
        name: string;
        node: string;
        sftp_details: {
          ip: string;
          port: number;
        };
        description: string;
        limits: {
          memory: number;
          swap: number;
          disk: number;
          io: number;
          cpu: number;
        };
        feature_limits: {
          databases: number;
          allocations: number;
          backups: number;
        };
        is_suspended: boolean;
        is_installing: boolean;
        relationships: {
          allocations: {
            object: string;
            data: Array<{
              object: string;
              attributes: {
                id: number;
                ip: string;
                ip_alias: string | null;
                port: number;
                notes: string | null;
                is_default: boolean;
              };
            }>;
          };
        };
      };
    }>;
    meta: {
      pagination: {
        total: number;
        count: number;
        per_page: number;
        current_page: number;
        total_pages: number;
        links: Record<string, any>;
      };
    };
  }
  
/**
 * Retrieves a list of all servers the authenticated user has access to.
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
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: "servers"
    });
}
