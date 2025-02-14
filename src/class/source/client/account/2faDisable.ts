import ClientAPICall from "../../../../functions/createAppCall";

/**
 * Disables Two-Factor Authentication (2FA) for the authenticated user.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string[]} options.tokens - An array of 2FA recovery codes to confirm disabling.
 * @returns {Promise<any>} - API response confirming 2FA deactivation.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function twoFactorDisable(options: { 
    apiKey: string; 
    panel: string; 
    tokens: string[];
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "DELETE",
        endpoint: "account/two-factor",
        body: { tokens: options.tokens }
    });
}
