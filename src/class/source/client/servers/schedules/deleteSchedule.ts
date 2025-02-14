/**
 * Deletes a schedule from a server.
 * 
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @param {string} options.schedule_id - The schedule identifier.
 * @returns {Promise<void>} - A promise that resolves when the schedule is deleted.
 */
export default async function deleteSchedule(options: { apiKey: string; panel: string; server_id: string; schedule_id: string }): Promise<void> {
    const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/schedules/${options.schedule_id}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${options.apiKey}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to delete schedule: ${await response.text()}`);
    }
}
