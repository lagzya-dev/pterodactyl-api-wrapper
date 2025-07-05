import ClientAPICall from "../../../../../functions/createClientCall";

/**
 * Decompresses a ZIP file on a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.file_path - The path of the ZIP file to decompress.
 * @returns {Promise<any>} - API response confirming decompression.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function decompressFile(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    file_path: string;
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/files/decompress`,
        body: JSON.stringify({ file: options.file_path })
    });
}
