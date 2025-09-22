import ClientAPICall from "../../../../../functions/createClientCall";

export interface Response {
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
  }
  

/**
 * Updates a startup variable for a specific server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {number} options.variable_id - The ID of the startup variable.
 * @param {string} options.value - The new value for the variable.
 * @returns {Promise<Response>} - API response confirming variable update.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function updateVariable(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    variable_id: number;
    value: string;
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "PUT",
        endpoint: `servers/${options.server_id}/startup/variable`,
        body: JSON.stringify({ key: options.variable_id, value: options.value })
    });
}
