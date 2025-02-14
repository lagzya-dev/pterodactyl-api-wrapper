/**
 * The Application class provides an interface for interacting with the
 * Pterodactyl Application API. This class gives full control over the panel,
 * including user, node, location, server, and nest management.
 *
 * @example
 * const app = new Application("YOUR_API_KEY");
 * const users = await app.users.list();
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
    /** Node Management */
    nodes: {
        list: () => Promise<any>;
        getDetails: (node_id: string) => Promise<any>;
        getConfiguration: (node_id: string) => Promise<any>;
        create: (node_data: any) => Promise<any>;
        update: (node_id: string, node_data: any) => Promise<any>;
        delete: (node_id: string) => Promise<any>;
    };
    /** Location Management */
    locations: {
        list: () => Promise<any>;
        getDetails: (location_id: string) => Promise<any>;
        create: (location_data: {
            short: string;
            long: string;
        }) => Promise<any>;
        update: (location_id: string, location_data: any) => Promise<any>;
        delete: (location_id: string) => Promise<any>;
    };
    /** Server Management */
    servers: {
        list: () => Promise<any>;
        getDetails: (server_id: string) => Promise<any>;
        getDetailsByExternalId: (external_id: string) => Promise<any>;
        updateDetails: (server_id: string, update_data: any) => Promise<any>;
        updateBuild: (server_id: string, build_data: any) => Promise<any>;
        updateStartup: (server_id: string, startup_data: any) => Promise<any>;
        create: (server_data: any) => Promise<any>;
        suspend: (server_id: string) => Promise<any>;
        unsuspend: (server_id: string) => Promise<any>;
        reinstall: (server_id: string) => Promise<any>;
        delete: (server_id: string) => Promise<any>;
        forceDelete: (server_id: string) => Promise<any>;
    };
    /** Nest & Egg Management */
    nests: {
        listNests: () => Promise<any>;
        getNestDetails: (nest_id: string) => Promise<any>;
        listEggs: (nest_id: string) => Promise<any>;
        getEggDetails: (nest_id: string, egg_id: string) => Promise<any>;
    };
}

/**
 * The Client class provides an interface for interacting with the Pterodactyl Client API.
 * It supports account management, server management (including commands, power actions, files, network, schedules, and server resources).
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
        sendCommand: (server_id: string, commandStr: string) => Promise<void>;
        powerAction: (server_id: string, signal: "start" | "stop" | "restart" | "kill") => Promise<void>;
        getConsoleDetails: (server_id: string) => Promise<any>;
        getResources: (server_id: string) => Promise<any>;
        getDetails: (server_id: string) => Promise<any>;
    };
    /** File Management */
    files: {
        list: (server_id: string, directory?: string) => Promise<any>;
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
    /** Schedule Management */
    schedules: {
        list: (server_id: string) => Promise<any>;
        createSchedule: (server_id: string, schedule_data: any) => Promise<any>;
        scheduleDetails: (server_id: string, schedule_id: string) => Promise<any>;
        updateSchedule: (server_id: string, schedule_id: string, schedule_data: any) => Promise<any>;
        deleteSchedule: (server_id: string, schedule_id: string) => Promise<void>;
        createTask: (server_id: string, schedule_id: string, task_data: any) => Promise<any>;
        updateTask: (server_id: string, schedule_id: string, task_id: string, task_data: any) => Promise<any>;
        deleteTask: (server_id: string, schedule_id: string, task_id: string) => Promise<void>;
    };
}

/**
 * The Setup class provides a way to configure global settings for the Pterodactyl API Wrapper.
 * The primary use is to set the panel URL, which is then used in all API requests.
 *
 * @example
 * Setup.setPanel("https://panel.example.com");
 * const panelUrl = Setup.getPanel();
 */
declare class Setup {
    private static panelUrl;
    /**
     * Sets the global panel URL.
     * @param url - The URL of the Pterodactyl panel.
     */
    static setPanel(url: string): void;
    /**
     * Gets the globally set panel URL.
     * @returns The panel URL.
     * @throws If the panel URL has not been set.
     */
    static getPanel(): string;
}

declare const _default: {
    Application: typeof Application;
    Client: typeof Client;
    Setup: typeof Setup;
};

export { _default as default };
