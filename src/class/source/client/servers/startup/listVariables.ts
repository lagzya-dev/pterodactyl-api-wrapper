import ClientAPICall from "../../../../../functions/createClientCall";

export interface Response {
    object: string;
    data: Array<{
      object: string;
      attributes: {
        name: string;
        description: string;
        env_variable: string;
        default_value: string;
        server_value: string;
        is_editable: boolean;
        rules: string;
      };
    }>;
    meta: {
      startup_command: string;
      raw_startup_command: string;
    };
  }

  
/**
 * Retrieves a list of all startup variables for a specific server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @returns {Promise<Response>} - API response containing the list of startup variables.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listVariables(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/${options.server_id}/startup/variables`
    });
}
