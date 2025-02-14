/**
 * Creates a task inside a specific schedule.
 * 
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @param {string} options.schedule_id - The schedule identifier.
 * @param {Object} options.task_data - The task details.
 * @returns {Promise<any>} - A promise resolving with the created task details.
 */
export default async function createTask(options: { apiKey: string; panel: string; server_id: string; schedule_id: string; task_data: any }): Promise<any> {
    const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/schedules/${options.schedule_id}/tasks`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${options.apiKey}`
        },
        body: JSON.stringify(options.task_data)
    });

    if (!response.ok) {
        throw new Error(`Failed to create task: ${await response.text()}`);
    }

    return await response.json();
}
