/**
 * Updates an existing task inside a specific schedule.
 *
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @param {string} options.schedule_id - The schedule identifier.
 * @param {string} options.task_id - The task identifier.
 * @param {Object} options.task_data - The updated task details.
 * @returns {Promise<any>} - A promise resolving with the updated task details.
 */
export default async function updateTask(options: {
    apiKey: string;
    panel: string;
    server_id: string;
    schedule_id: string;
    task_id: string;
} & Record<string, any>): Promise<any> {
    const { apiKey, panel, server_id, schedule_id, task_id, ...task_data } = options;

    const response = await fetch(`${panel}/api/client/servers/${server_id}/schedules/${schedule_id}/tasks/${task_id}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(task_data)
    });

    if (!response.ok) {
        throw new Error(`Failed to update task: ${await response.text()}`);
    }

    return await response.json();
}
