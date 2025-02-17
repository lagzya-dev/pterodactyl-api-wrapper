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
 * Creates a new user in the Pterodactyl panel using the provided user details.
 * If `first_name` or `last_name` are not provided, they default to `"Pterodactyl"` and `"User"`, respectively.
 *
 * @param {Object} options - Configuration options for the API call.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {Object} options.user_details - The details of the user to be created.
 * @param {string} options.user_details.email - The email address of the user.
 * @param {string} options.user_details.username - The username of the user.
 * @param {string} [options.user_details.first_name="Pterodactyl"] - The first name of the user (optional).
 * @param {string} [options.user_details.last_name="User"] - The last name of the user (optional).
 * @returns {Promise<Response>} - A Promise resolving to the API response.
 *
 * @throws {Error} - Throws an error if the API request fails.
 *
 * @example
 * (async () => {
 *     try {
 *         const newUser = await createUser({
 *             panel: "https://panel.example.com",
 *             apiKey: "your-api-key",
 *             user_details: {
 *                 email: "newuser@example.com",
 *                 username: "newUser123",
 *                 first_name: "John",
 *                 last_name: "Doe"
 *             }
 *         });
 *         console.log("User Created:", newUser);
 *     } catch (error) {
 *         console.error("Error creating user:", error);
 *     }
 * })();
 */
export default async function createUser(options: {
    apiKey: string;
    panel: string;
    user_details: {
        email: string;
        username: string;
        first_name?: string;
        last_name?: string;
    };
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: "users",
        body: JSON.stringify({
            email: options.user_details.email,
            username: options.user_details.username,
            first_name: options.user_details.first_name ?? "Pterodactyl",
            last_name: options.user_details.last_name ?? "User"
        }) 
    });
}
