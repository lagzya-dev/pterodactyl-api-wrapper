/**
 * Sends a command to a server's console.
 * 
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @param {string} options.command - The command to execute.
 * @returns {Promise<void>} - A promise that resolves when the command is sent.
 */
export default async function command(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string; 
    command: string; 
}): Promise<void> {
    const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/command`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${options.apiKey}`
        },
        body: JSON.stringify({ command: options.command })
    });

    if (!response.ok) {
        throw new Error(`Failed to send command: ${await response.text()}`);
    }
}
