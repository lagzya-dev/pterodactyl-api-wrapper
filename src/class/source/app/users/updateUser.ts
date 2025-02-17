import ApplicationAPICall from "../../../../functions/createAppCall";

interface Response {
    object: string,
    attributes: {
        id: number,
        external_id: string | null,
        uuid: string,
        username: string,
        email: string,
        first_name: string,
        last_name: string,
        language: string,
        root_admin: string,
        "2fa": boolean,
        created_at: string,
        updated_at: string
    }
}

/**
 * Updates a user's details on the Pterodactyl panel.
 * You can update the user's email, username, first name, last name, language, or password.
 *
 * @param {Object} options - Configuration options for the API call.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.user_id - The ID of the user to update.
 * @param {Object} options.data - The data to update for the user.
 * @param {string} [options.data.email] - The new email of the user (optional).
 * @param {string} [options.data.username] - The new username of the user (optional).
 * @param {string} [options.data.first_name] - The new first name of the user (optional).
 * @param {string} [options.data.last_name] - The new last name of the user (optional).
 * @param {string} [options.data.language] - The new language preference for the user (optional).
 * @param {string} [options.data.password] - The new password for the user (optional).
 * @returns {Promise<Response>} - A Promise resolving to the API response.
 *
 * @throws {Error} - Throws an error if the API request fails.
 *
 * @example
 * (async () => {
 *     try {
 *         const updatedUser = await updateUser({
 *             panel: "https://panel.example.com",
 *             apiKey: "your-api-key",
 *             user_id: 1234,
 *             data: {
 *                 email: "newemail@example.com",
 *                 username: "UpdatedUsername",
 *                 first_name: "John",
 *                 last_name: "Doe"
 *             }
 *         });
 *         console.log("User Updated:", updatedUser);
 *     } catch (error) {
 *         console.error("Error updating user:", error);
 *     }
 * })();
 */
export default async function updateUser(options: {
    apiKey: string;
    panel: string;
    user_id: number;
    data: {
        email?: string;
        username?: string;
        first_name?: string;
        last_name?: string;
        language?: string;
        password?: string;
    };
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        endpoint: `users/${options.user_id}`, // Fixed endpoint (removed extra "/")
        method: "PATCH",
        body: JSON.stringify(options.data) // Ensured the body is stringified
    });
}