/**
 * Sends a power action to a server (start, stop, restart, kill).
 * 
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @param {string} options.signal - The power action (start, stop, restart, kill).
 * @returns {Promise<void>} - A promise that resolves when the power action is sent.
 */
export default async function power(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string; 
    signal: "start" | "stop" | "restart" | "kill"; 
}): Promise<void> {
    const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/power`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${options.apiKey}`
        },
        body: JSON.stringify({ signal: options.signal })
    });

    if (!response.ok) {
        throw new Error(`Failed to send power action: ${await response.text()}`);
    }
}
