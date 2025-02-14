/**
 * Updates an existing schedule for a server.
 * 
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @param {string} options.schedule_id - The schedule identifier.
 * @param {Object} options.schedule_data - The updated schedule details.
 * @returns {Promise<any>} - A promise resolving with the updated schedule.
 */
export default async function updateSchedule(options: { apiKey: string; panel: string; server_id: string; schedule_id: string; schedule_data: any }): Promise<any> {
    const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/schedules/${options.schedule_id}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${options.apiKey}`
        },
        body: JSON.stringify(options.schedule_data)
    });

    if (!response.ok) {
        throw new Error(`Failed to update schedule: ${await response.text()}`);
    }

    return await response.json();
}
