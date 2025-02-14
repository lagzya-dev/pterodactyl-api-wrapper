import Setup from "./Setup";

// Import account functions
import accountDetails from "../source/client/account/accountDetails";
import twoFactorEnable from "../source/client/account/2faEnable";
import twoFactorDisable from "../source/client/account/2faDisable";
import updateEmail from "../source/client/account/updateEmail";
import updatePassword from "../source/client/account/updatePassword";
import createApiKey from "../source/client/account/createApiKey";
import deleteApiKey from "../source/client/account/deleteApiKey";
import listApiKeys from "../source/client/account/listApiKeys";

// Import server functions
import listServers from "../source/client/listServers";
import showPermissions from "../source/client/showPermissions";
import command from "../source/client/servers/command";
import power from "../source/client/servers/power";
import consoleDetails from "../source/client/servers/consoleDetails";
import resources from "../source/client/servers/resources";
import serverDetails from "../source/client/servers/serverDetails";

// Import file management functions
import listFiles from "../source/client/servers/files/listFiles";
import getFileContent from "../source/client/servers/files/getFileContent";
import downloadFile from "../source/client/servers/files/downloadFile";
import renameFile from "../source/client/servers/files/renameFile";
import copyFile from "../source/client/servers/files/copyFile";
import writeFile from "../source/client/servers/files/writeFile";
import compressFile from "../source/client/servers/files/compressFile";
import decompressFile from "../source/client/servers/files/decompressFile";
import deleteFile from "../source/client/servers/files/deleteFile";
import createFolder from "../source/client/servers/files/createFolder";
import uploadFile from "../source/client/servers/files/uploadFile";

// Import schedule functions
import listSchedules from "../source/client/servers/schedules/listSchedules";
import createSchedule from "../source/client/servers/schedules/createSchedule";
import scheduleDetails from "../source/client/servers/schedules/scheduleDetails";
import updateSchedule from "../source/client/servers/schedules/updateSchedule";
import deleteSchedule from "../source/client/servers/schedules/deleteSchedule";
import createTask from "../source/client/servers/schedules/createTask";
import updateTask from "../source/client/servers/schedules/updateTask";
import deleteTask from "../source/client/servers/schedules/deleteTask";

/**
 * The Client class provides an interface for interacting with the Pterodactyl Client API.
 * It supports account management, server management (including commands, power actions, files, network, schedules, and server resources).
 */
export default class Client {
    private apiKey: string;
    private panel: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.panel = Setup.getPanel();
    }

    /** Account Management */
    public account = {
        getDetails: () => accountDetails({ apiKey: this.apiKey, panel: this.panel }),
        enable2FA: (codes: string[]) => twoFactorEnable({ apiKey: this.apiKey, panel: this.panel, codes }),
        disable2FA: (tokens: string[]) => twoFactorDisable({ apiKey: this.apiKey, panel: this.panel, tokens }),
        updateEmail: (email: string, password: string) => updateEmail({ apiKey: this.apiKey, panel: this.panel, email, password }),
        updatePassword: (current_password: string, new_password: string) => updatePassword({ apiKey: this.apiKey, panel: this.panel, current_password, new_password }),
        createApiKey: (description: string, allowed_ips: string[]) => createApiKey({ apiKey: this.apiKey, panel: this.panel, description, allowed_ips }),
        deleteApiKey: (key_id: string) => deleteApiKey({ apiKey: this.apiKey, panel: this.panel, key_id }),
        listApiKeys: () => listApiKeys({ apiKey: this.apiKey, panel: this.panel }),
    };

    /** Server Management */
    public servers = {
        list: () => listServers({ apiKey: this.apiKey, panel: this.panel }),
        showPermissions: (server_id: string) => showPermissions({ apiKey: this.apiKey, panel: this.panel, server_id }),
        sendCommand: (server_id: string, commandStr: string) => command({ apiKey: this.apiKey, panel: this.panel, server_id, command: commandStr }),
        powerAction: (server_id: string, signal: "start" | "stop" | "restart" | "kill") => power({ apiKey: this.apiKey, panel: this.panel, server_id, signal }),
        getConsoleDetails: (server_id: string) => consoleDetails({ apiKey: this.apiKey, panel: this.panel, server_id }),
        getResources: (server_id: string) => resources({ apiKey: this.apiKey, panel: this.panel, server_id }),
        getDetails: (server_id: string) => serverDetails({ apiKey: this.apiKey, panel: this.panel, server_id }),
    };

    /** File Management */
    public files = {
        list: (server_id: string, directory?: string) => listFiles({ apiKey: this.apiKey, panel: this.panel, server_id, directory }),
        getContent: (server_id: string, file_path: string) => getFileContent({ apiKey: this.apiKey, panel: this.panel, server_id, file_path }),
        download: (server_id: string, file_path: string) => downloadFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_path }),
        rename: (server_id: string, from: string, to: string) => renameFile({ apiKey: this.apiKey, panel: this.panel, server_id, files: [{ from, to }] }),
        copy: (server_id: string, file_path: string) => copyFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_path }),
        write: (server_id: string, file_path: string, content: string) => writeFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_path, content }),
        compress: (server_id: string, files: string[]) => compressFile({ apiKey: this.apiKey, panel: this.panel, server_id, files }),
        decompress: (server_id: string, file_path: string) => decompressFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_path }),
        delete: (server_id: string, files: string[]) => deleteFile({ apiKey: this.apiKey, panel: this.panel, server_id, files }),
        createFolder: (server_id: string, folder_path: string) => createFolder({ apiKey: this.apiKey, panel: this.panel, server_id, folder_path }),
        upload: (server_id: string, file_data: FormData) => uploadFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_data }),
    };

    /** Schedule Management */
    public schedules = {
        list: (server_id: string) => listSchedules({ apiKey: this.apiKey, panel: this.panel, server_id }),
        createSchedule: (server_id: string, schedule_data: any) => createSchedule({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_data }),
        scheduleDetails: (server_id: string, schedule_id: string) => scheduleDetails({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_id }),
        updateSchedule: (server_id: string, schedule_id: string, schedule_data: any) => updateSchedule({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_id, schedule_data }),
        deleteSchedule: (server_id: string, schedule_id: string) => deleteSchedule({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_id }),
        createTask: (server_id: string, schedule_id: string, task_data: any) => createTask({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_id, task_data }),
        updateTask: (server_id: string, schedule_id: string, task_id: string, task_data: any) => updateTask({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_id, task_id, task_data }),
        deleteTask: (server_id: string, schedule_id: string, task_id: string) => deleteTask({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_id, task_id }),
    };
}
