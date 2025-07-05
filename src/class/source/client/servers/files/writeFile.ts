import ClientAPICall from "../../../../../functions/createClientCall";

/**
 * Writes content to a file on a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string} options.file_path - The path of the file to write.
 * @param {string} options.content - The content to write to the file.
 * @returns {Promise<any>} - API response confirming file write operation.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function writeFile(options: {
  apiKey: string;
  panel: string;
  server_id: string;
  file_path: string;
  content: string;
}): Promise<any> {
  return ClientAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/files/write`,
    body: JSON.stringify({
      file: options.file_path,
      contents: options.content,
    }),
  });
}
