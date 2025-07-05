import ClientAPICall from "../../../../functions/createClientCall";

/**
 * Updates the password of the authenticated user.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.current_password - The current password for confirmation.
 * @param {string} options.new_password - The new password to set.
 * @returns {Promise<any>} - API response confirming password update.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function updatePassword(options: { 
    apiKey: string; 
    panel: string; 
    current_password: string;
    new_password: string;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "PUT",
        endpoint: "account/password",
        body: {
            current_password: options.current_password,
            password: options.new_password
        }
    });
}
