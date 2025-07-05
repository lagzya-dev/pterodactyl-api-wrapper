import ClientAPICall from "../../../../../functions/createClientCall";

export interface Response {
    object: string;
    attributes: {
      url: string;
    };
  }
  

/**
 * Retrieves a download link for a file.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.file_path - The path of the file to download.
 * @returns {Promise<Response>} - API response containing the download URL.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function downloadFile(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    file_path: string;
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `servers/${options.server_id}/files/download?file=${encodeURIComponent(options.file_path)}`
    });
}
