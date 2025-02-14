/**
 * Fetches resource usage (CPU, RAM, disk) for a server.
 * 
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @returns {Promise<any>} - A promise resolving with server resource usage details.
 */
export default async function resources(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string; 
}): Promise<any> {
    const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/resources`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${options.apiKey}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch server resources: ${await response.text()}`);
    }

    return await response.json();
}
