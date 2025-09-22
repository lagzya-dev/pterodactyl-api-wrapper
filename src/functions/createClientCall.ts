import axios from "axios";

/**
 * Creates an API Call to the Client API of your Pterodactyl panel.
 *
 * @param {Object} options - API call options.
 * @param {string} options.panel - Your panel's URL.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.endpoint - The API endpoint to call.
 * @param {"GET" | "DELETE" | "POST" | "PUT" | "PATCH"} options.method - HTTP method.
 * @param {any} [options.body] - Request body (for POST, PUT, PATCH requests).
 * @returns {Promise<any>} - The data fetched from the API.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function ClientAPICall(options: {
  panel: string;
  apiKey: string;
  endpoint: string;
  method: "GET" | "DELETE" | "POST" | "PUT" | "PATCH";
  body?: any;
}): Promise<any> {
  const url = `${options.panel}/api/client/${options.endpoint}`;

  const isFileWrite = options.endpoint.includes("/files/write");

  const headers = {
    Accept: "application/json",
    "Content-Type": isFileWrite ? "text/plain" : "application/json",
    Authorization: `Bearer ${options.apiKey}`,
  };

  try {
    if (["POST", "PUT", "PATCH"].includes(options.method)) {
      const response = await axios({
        method: options.method,
        url,
        headers,
        data: isFileWrite
          ? options.body
          : options.body
          ? JSON.stringify(options.body)
          : undefined,
      });
      return response.data;
    } else {
      const response = await fetch(url, {
        method: options.method,
        headers,
      });

      if (!response.ok) {
        throw new Error(
          `API call failed with status ${
            response.status
          }: ${await response.text()}`
        );
      }

      return await response.json();
    }
  } catch (error) {
    console.log(error)
    throw new Error(
      `Error in API call: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
