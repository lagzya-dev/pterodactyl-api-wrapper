import ClientAPICall from "../../../../functions/createAppCall";

/**
 * Updates the email address of the authenticated user.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.email - The new email address.
 * @param {string} options.password - The current password (required for confirmation).
 * @returns {Promise<any>} - API response confirming email update.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function updateEmail(options: { 
    apiKey: string; 
    panel: string; 
    email: string;
    password: string;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "PUT",
        endpoint: "account/email",
        body: {
            email: options.email,
            password: options.password
        }
    });
}
