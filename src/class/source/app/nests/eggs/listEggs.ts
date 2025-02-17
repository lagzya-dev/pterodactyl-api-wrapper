import ApplicationAPICall from "../../../../../functions/createAppCall";

export interface Response {
    object: string;
    data: Array<{
      object: string;
      attributes: {
        id: number;
        uuid: string;
        name: string;
        nest: number;
        author: string;
        description: string;
        docker_image: string;
        config: {
          files: {
            [filename: string]: {
              parser: string;
              find: {
                [key: string]: any;
              };
            };
          };
        };
        startup: {
          done: string;
          userInteraction: string[];
        };
        stop: string;
        logs: {
          custom: boolean;
          location: string;
        };
        script: {
          privileged: boolean;
          install: string;
          entry: string;
          container: string;
          extends: any;
        };
        created_at: string;
        updated_at: string;
        relationships: {
          nest: {
            object: string;
            attributes: {
              id: number;
              uuid: string;
              author: string;
              name: string;
              description: string;
              created_at: string;
              updated_at: string;
            };
          };
          servers: {
            object: string;
            data: any[];
          };
        };
      };
    }>;
  }
  

/**
 * Retrieves a list of all eggs within a specific nest.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.nest_id - The ID of the nest.
 * @returns {Promise<Response>} - API response containing the list of eggs.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listEggs(options: { 
    apiKey: string; 
    panel: string; 
    nest_id: number;
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `nests/${options.nest_id}/eggs`
    });
}
