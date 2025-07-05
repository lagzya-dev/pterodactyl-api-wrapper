import ClientAPICall from "../../../../functions/createClientCall";

export interface Response {
    data: {
      image_url_data: string;
    };
  }
  

/**
 * Retrieves the Two-Factor Authentication (2FA) details for the authenticated user.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @returns {Promise<Response>} - API response containing 2FA details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function twoFactorDetails(options: { 
    apiKey: string; 
    panel: string; 
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: "account/two-factor"
    });
}
