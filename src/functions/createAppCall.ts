import axios from "axios";

/**
 * Creates an API Call to the Application API of your Pterodactyl panel.
 *
 * @param {Object} options - API call options.
 * @param {string} options.panel - Your panel's URL.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.endpoint - The API endpoint to call.
 * @param {"GET" | "DELETE" | "POST" | "PATCH" | "PUT"} options.method - HTTP method.
 * @param {any} [options.body] - Request body (for POST and PATCH requests).
 * @returns {Promise<any>} - The data fetched from the API.
 *
 * @throws {Error} - Throws an error if the API request fails.
 *
 * @example
 * (async () => {
 *     try {
 *         const data = await ApplicationAPICall({
 *             panel: "https://panel.example.com",
 *             apiKey: "your-api-key",
 *             endpoint: "users",
 *             method: "GET"
 *         });
 *         console.log("API Response:", data);
 *     } catch (error) {
 *         console.error("Error:", error);
 *     }
 * })();
 */
export default async function ApplicationAPICall(options: {
    panel: string;
    apiKey: string;
    endpoint: string;
    method: "GET" | "DELETE" | "POST" | "PATCH" | "PUT";
    body?: any;
}): Promise<any> {
    const url = `${options.panel}/api/application/${options.endpoint}`;
    const headers = {
        'Accept': "application/json",
        'Content-Type': "application/json",
        'Authorization': `Bearer ${options.apiKey}`
    };

    let body: string | undefined = undefined;

    if (options.body && options.method !== "GET" && options.method !== "DELETE") {
        body = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
    }

    try {
        if (options.method === "PATCH") {
            const response = await axios.patch(url, options.body, { headers });
            return response.data;
        } else {
            const response = await fetch(url, {
                method: options.method,
                headers,
                body
            });

            if (!response.ok) {
                throw new Error(`API call failed with status ${response.status}: ${await response.text()}`);
            }

            return await response.json();
        }
    } catch (error) {
        throw new Error(`Error in API call: ${error instanceof Error ? error.message : String(error)}`);
    }
}
