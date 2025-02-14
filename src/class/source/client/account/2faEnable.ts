import ClientAPICall from "../../../../functions/createAppCall";

/**
 * Enables Two-Factor Authentication (2FA) for the authenticated user.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string[]} options.codes - The TOTP authentication codes for verification.
 * @returns {Promise<any>} - API response confirming 2FA activation.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function twoFactorEnable(options: { 
    apiKey: string; 
    panel: string; 
    codes: string[];
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: "account/two-factor",
        body: { codes: options.codes }
    });
}
