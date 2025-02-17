interface Response {
    data: {
      token: string;
      socket: string;
    };
  }
  
/**
 * Retrieves real-time console details for a server.
 * 
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @returns {Promise<Response>} - A promise resolving with console details.
 */
export default async function consoleDetails(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string; 
}): Promise<Response> {
    const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/websocket`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${options.apiKey}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch console details: ${await response.text()}`);
    }

    return await response.json();
}
