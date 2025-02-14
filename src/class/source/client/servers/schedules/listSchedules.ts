/**
 * Retrieves a list of all schedules for a specified server.
 * 
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @returns {Promise<any>} - A promise resolving with the list of schedules.
 */
export default async function listSchedules(options: { apiKey: string; panel: string; server_id: string }): Promise<any> {
    const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/schedules`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${options.apiKey}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch schedules: ${await response.text()}`);
    }

    return await response.json();
}
