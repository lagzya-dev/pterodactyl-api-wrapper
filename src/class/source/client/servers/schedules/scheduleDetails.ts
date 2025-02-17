export interface Response {
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
          data: Array<{
            object: string;
            attributes: {
              id: number;
              sequence_id: number;
              action: string;
              payload: string;
              time_offset: number;
              is_queued: boolean;
              created_at: string;
              updated_at: string;
            };
          }>;
        };
      };
    };
  }
  

/**
 * Retrieves details of a specific schedule for a server.
 * 
 * @param {Object} options - API options.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.panel - The panel URL.
 * @param {string} options.server_id - The server identifier.
 * @param {string} options.schedule_id - The schedule identifier.
 * @returns {Promise<Response>} - A promise resolving with the schedule details.
 */
export default async function scheduleDetails(options: { apiKey: string; panel: string; server_id: string; schedule_id: string }): Promise<Response> {
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
