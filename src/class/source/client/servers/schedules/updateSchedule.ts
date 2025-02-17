interface Response {
    object: string;
    attributes: {
      id: number;
      name: string;
      cron: {
        day_of_week: string;
        day_of_month: string;
        hour: string;
        minute: string;
      };
      is_active: boolean;
      is_processing: boolean;
      last_run_at: string | null;
      next_run_at: string;
      created_at: string;
      updated_at: string;
      relationships: {
        tasks: {
          object: string;
          data: any[];
        };
      };
    };
  }
  

/**
 * Updates an existing schedule for a server.
 * 
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @param {string} options.schedule_id - The schedule identifier.
 * @param {Object} options.schedule_data - The updated schedule details.
 * @returns {Promise<Response>} - A promise resolving with the updated schedule.
 */
export default async function updateSchedule(options: { apiKey: string; panel: string; server_id: string; schedule_id: string; schedule_data: any }): Promise<Response> {
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
