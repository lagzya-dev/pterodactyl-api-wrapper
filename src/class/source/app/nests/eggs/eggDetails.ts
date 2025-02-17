import ApplicationAPICall from "../../../../../functions/createAppCall";

export interface Response {
    object: string,
    attributes: {
        id: number,
        uuid: string,
        name: string,
        nest: number,
        author: string,
        description: string,
        docker_image: string,
        config: {
            files: object,
            startup: {
                done: string,
                userInteraction: []
            },
            stop: string,
            logs: {
                custom: boolean,
                location: string
            },
            extends: any
        },
        startup: string,
        script: {
            privileged: boolean,
            install: string,
            entry: string,
            container: string,
            extends: any
        },
        created_at: string,
        updated_at: string
    }
}

/**
 * Retrieves details of a specific egg from a nest.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.nest_id - The ID of the nest.
 * @param {number} options.egg_id - The ID of the egg to retrieve.
 * @returns {Promise<Response>} - API response containing egg details.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function eggDetails(options: { 
    apiKey: string; 
    panel: string; 
    nest_id: number;
    egg_id: number;
}): Promise<Response> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `nests/${options.nest_id}/eggs/${options.egg_id}`
    });
}
