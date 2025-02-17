interface Response {
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
    meta: {
      is_server_owner: boolean;
      user_permissions: string[];
    };
  }
  


/**
 * Retrieves details for a specific server.
 * 
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @returns {Promise<Response>} - A promise resolving with server details.
 */
export default async function serverDetails(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string; 
}): Promise<Response> {
    const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${options.apiKey}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch server details: ${await response.text()}`);
    }

    return await response.json();
}
