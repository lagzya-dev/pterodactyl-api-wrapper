import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Retrieves details of a specific server using an external identifier.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.external_id - The external identifier of the server.
 * @returns {Promise<any>} - API response containing server details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function serverDetailsExternalIdentifier(options: { 
    apiKey: string; 
    panel: string; 
    external_id: string;
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/external/${options.external_id}`
    });
}
