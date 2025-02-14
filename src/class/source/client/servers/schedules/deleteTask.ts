/**
 * Deletes a specific task inside a schedule.
 * 
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @param {string} options.schedule_id - The schedule identifier.
 * @param {string} options.task_id - The task identifier.
 * @returns {Promise<void>} - A promise that resolves when the task is deleted.
 */
export default async function deleteTask(options: { apiKey: string; panel: string; server_id: string; schedule_id: string; task_id: string }): Promise<void> {
    const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/schedules/${options.schedule_id}/tasks/${options.task_id}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${options.apiKey}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to delete task: ${await response.text()}`);
    }
}

