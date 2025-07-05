import ClientAPICall from "../../../functions/createClientCall";

export interface Response {
  object: string;
  attributes: {
    permissions: {
      websocket: {
        description: string;
        keys: {
          connect: string;
        };
      };
      control: {
        description: string;
        keys: {
          console: string;
          start: string;
          stop: string;
          restart: string;
        };
      };
      user: {
        description: string;
        keys: {
          create: string;
          read: string;
          update: string;
          delete: string;
        };
      };
      file: {
        description: string;
        keys: {
          create: string;
          read: string;
          update: string;
          delete: string;
          archive: string;
          sftp: string;
        };
      };
      backup: {
        description: string;
        keys: {
          create: string;
          read: string;
          update: string;
          delete: string;
          download: string;
        };
      };
      allocation: {
        description: string;
        keys: {
          read: string;
          create: string;
          update: string;
          delete: string;
        };
      };
      startup: {
        description: string;
        keys: {
          read: string;
          update: string;
        };
      };
      database: {
        description: string;
        keys: {
          create: string;
          read: string;
          update: string;
          delete: string;
          view_password: string;
        };
      };
      schedule: {
        description: string;
        keys: {
          create: string;
          read: string;
          update: string;
          delete: string;
        };
      };
      settings: {
        description: string;
        keys: {
          rename: string;
          reinstall: string;
        };
      };
    };
  };
}

/**
 * Retrieves the permissions the authenticated user has for a specific server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @returns {Promise<Response>} - API response containing the list of permissions for the user.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function showPermissions(options: {
  apiKey: string;
  panel: string;
  server_id: string;
}): Promise<Response> {
  return ClientAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `servers/${options.server_id}/permissions`,
  });
}
