/**
 * Retrieves details of a specific schedule for a server.
 * 
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @param {string} options.schedule_id - The schedule identifier.
 * @returns {Promise<any>} - A promise resolving with the schedule details.
 */
export default async function scheduleDetails(options: { apiKey: string; panel: string; server_id: string; schedule_id: string }): Promise<any> {
    const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/schedules/${options.schedule_id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${options.apiKey}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch schedule details: ${await response.text()}`);
    }

    return await response.json();
}
