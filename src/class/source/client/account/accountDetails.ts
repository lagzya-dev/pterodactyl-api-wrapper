import ClientAPICall from "../../../../functions/createAppCall";

/**
 * Retrieves account details for the authenticated user.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @returns {Promise<any>} - API response containing account details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function accountDetails(options: { 
    apiKey: string; 
    panel: string; 
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: "account"
    });
}
