/**
 * The `Application` class provides an interface for interacting with the Pterodactyl Application API.
 * It allows full control over the panel, including user, server, and node management.
 *
 * Usage:
 * ```ts
 * const app = new Application("YOUR_API_KEY");
 * const users = await app.users.list();
 * ```
 */
declare class Application {
    private apiKey;
    private panel;
    constructor(apiKey: string);
    /** User Management */
    users: {
        list: () => Promise<any>;
        getDetails: (user_id: string) => Promise<any>;
        getDetailsByExternalId: (external_id: string) => Promise<any>;
        create: (user_details: {
            email: string;
            username: string;
            first_name?: string;
            last_name?: string;
        }) => Promise<any>;
        update: (user_id: string, user_data: any) => Promise<any>;
        delete: (user_id: string) => Promise<any>;
    };
}

/**
 * The `Client` class provides an interface for interacting with the Pterodactyl Client API.
 * It contains multiple functions allowing users to manage accounts, servers, files, networks, schedules, and more.
 *
 * Usage:
 * ```ts
 * const client = new Client("YOUR_API_KEY");
 * const accountDetails = await client.account.getDetails();
 * ```
 */
declare class Client {
    private apiKey;
    private panel;
    constructor(apiKey: string);
    /** Account Management */
    account: {
        getDetails: () => Promise<any>;
        enable2FA: (codes: string[]) => Promise<any>;
        disable2FA: (tokens: string[]) => Promise<any>;
        updateEmail: (email: string, password: string) => Promise<any>;
        updatePassword: (current_password: string, new_password: string) => Promise<any>;
        createApiKey: (description: string, allowed_ips: string[]) => Promise<any>;
        deleteApiKey: (key_id: string) => Promise<any>;
        listApiKeys: () => Promise<any>;
    };
    /** Server Management */
    servers: {
        list: () => Promise<any>;
        showPermissions: (server_id: string) => Promise<any>;
    };
    /** File Management */
    files: {
        list: (server_id: string) => Promise<any>;
        getContent: (server_id: string, file_path: string) => Promise<any>;
        download: (server_id: string, file_path: string) => Promise<any>;
        rename: (server_id: string, from: string, to: string) => Promise<any>;
        copy: (server_id: string, file_path: string) => Promise<any>;
        write: (server_id: string, file_path: string, content: string) => Promise<any>;
        compress: (server_id: string, files: string[]) => Promise<any>;
        decompress: (server_id: string, file_path: string) => Promise<any>;
        delete: (server_id: string, files: string[]) => Promise<any>;
        createFolder: (server_id: string, folder_path: string) => Promise<any>;
        upload: (server_id: string, file_data: FormData) => Promise<any>;
    };
}

/**
 * The `Setup` class provides a way to configure the panel URL globally.
 * Users can set their panel URL once and use it across multiple API calls without needing to specify it repeatedly.
 *
 * Usage:
 * ```ts
 * Setup.setPanel("https://panel.example.com");
 * const panel = Setup.getPanel();
 * ```
 */
declare class Setup {
    private static panelUrl;
    /**
     * Sets the global panel URL for API requests.
     * @param {string} url - The URL of the Pterodactyl panel.
     */
    static setPanel(url: string): void;
    /**
     * Retrieves the globally set panel URL.
     * @returns {string} The panel URL.
     */
    static getPanel(): string;
}

declare const _default: {
    Application: typeof Application;
    Client: typeof Client;
    Setup: typeof Setup;
};

export { _default as default };
