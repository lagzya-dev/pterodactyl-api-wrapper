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

// Import general server functions
import listServers from "../source/client/listServers";
import showPermissions from "../source/client/showPermissions";
import command from "../source/client/servers/command";
import power from "../source/client/servers/power";
import consoleDetails from "../source/client/servers/consoleDetails";
import resources from "../source/client/servers/resources";
import serverDetails from "../source/client/servers/serverDetails";

// Import backup functions
import listBackups from "../source/client/servers/backups/listBackups";
import backupDetails from "../source/client/servers/backups/backupDetails";
import createBackup from "../source/client/servers/backups/createBackup";
import deleteBackup from "../source/client/servers/backups/deleteBackup";
import downloadBackup from "../source/client/servers/backups/downloadBackup";

// Import database functions
import listDatabases from "../source/client/servers/databases/listDatabases";
import createDatabase from "../source/client/servers/databases/createDatabase";
import deleteDatabase from "../source/client/servers/databases/deleteDatabase";
import rotatePassword from "../source/client/servers/databases/rotatePassword";

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

// Import network management functions
import listAllocations from "../source/client/servers/network/listAllocations";
import assignAllocations from "../source/client/servers/network/assignAllocations";
import setAllocationNote from "../source/client/servers/network/setAllocationNote";
import setPrimaryAllocation from "../source/client/servers/network/setPrimaryAllocation";
import unassignAllocation from "../source/client/servers/network/unassignAllocation";

// Import schedule functions
import listSchedules from "../source/client/servers/schedules/listSchedules";
import createSchedule from "../source/client/servers/schedules/createSchedule";
import scheduleDetails from "../source/client/servers/schedules/scheduleDetails";
import updateSchedule from "../source/client/servers/schedules/updateSchedule";
import deleteSchedule from "../source/client/servers/schedules/deleteSchedule";
import createTask from "../source/client/servers/schedules/createTask";
import updateTask from "../source/client/servers/schedules/updateTask";
import deleteTask from "../source/client/servers/schedules/deleteTask";

// Import settings functions
import renameServer from "../source/client/servers/settings/renameServer";
import reinstallServer from "../source/client/servers/settings/reinstallServer";

// Import startup functions
import listVariables from "../source/client/servers/startup/listVariables";
import updateVariable from "../source/client/servers/startup/updateVariable";

// Import user management functions
import listUsers from "../source/client/servers/users/listUsers";
import createUser from "../source/client/servers/users/createUser";
import updateUser from "../source/client/servers/users/updateUser";
import deleteUser from "../source/client/servers/users/deleteUser";
import userDetails from "../source/client/servers/users/userDetails";

/**
 * The `Client` class provides an interface for interacting with the Pterodactyl Client API.
 * It supports **account management, server control, file operations, backups, networking, schedules, settings, startup variables, and more**.
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

    /** Backup Management */
    public backups = {
        list: (server_id: string) => listBackups({ apiKey: this.apiKey, panel: this.panel, server_id }),
        getDetails: (server_id: string, backup_id: string) => backupDetails({ apiKey: this.apiKey, panel: this.panel, server_id, backup_id }),
        create: (server_id: string, backup_data: any) => createBackup({ apiKey: this.apiKey, panel: this.panel, server_id, backup_data }),
        delete: (server_id: string, backup_id: string) => deleteBackup({ apiKey: this.apiKey, panel: this.panel, server_id, backup_id }),
        download: (server_id: string, backup_id: string) => downloadBackup({ apiKey: this.apiKey, panel: this.panel, server_id, backup_id }),
    };

    /** Settings */
    public settings = {
        renameServer: (server_id: string, new_name: string) => renameServer({ 
            apiKey: this.apiKey, 
            panel: this.panel, 
            server_id, 
            new_name
        }),        
        reinstallServer: (server_id: string) => reinstallServer({ apiKey: this.apiKey, panel: this.panel, server_id }),
    };
    
    /** Network Management */
    public network = {
        listAllocations: (server_id: string) => listAllocations({ apiKey: this.apiKey, panel: this.panel, server_id }),
        assignAllocations: (server_id: string, allocation_id: number) => assignAllocations({ 
            apiKey: this.apiKey, 
            panel: this.panel, 
            server_id, 
            allocation_id
        }),        
        setAllocationNote: (server_id: string, allocation_id: string, note: string) => setAllocationNote({ 
            apiKey: this.apiKey, 
            panel: this.panel, 
            server_id, 
            allocation_id: parseInt(allocation_id), 
            note 
        }),
        
        setPrimaryAllocation: (server_id: string, allocation_id: string) => setPrimaryAllocation({ 
            apiKey: this.apiKey, 
            panel: this.panel, 
            server_id, 
            allocation_id: parseInt(allocation_id) 
        }),
        
        unassignAllocation: (server_id: string, allocation_id: string) => unassignAllocation({ 
            apiKey: this.apiKey, 
            panel: this.panel, 
            server_id, 
            allocation_id: parseInt(allocation_id) 
        }),        
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
    
    /** Startup Management */
    public startup = {
        listVariables: (server_id: string) => listVariables({ apiKey: this.apiKey, panel: this.panel, server_id }),
        updateVariable: (server_id: string, variable_id: string, value: string) => updateVariable({ 
            apiKey: this.apiKey, 
            panel: this.panel, 
            server_id, 
            variable_id: variable_id, 
            value 
        }),        
    };
    
    /** User Management */
    public users = {
        listUsers: (server_id: string) => listUsers({ apiKey: this.apiKey, panel: this.panel, server_id }),
        createUser: (server_id: string, user_data: any) => createUser({ apiKey: this.apiKey, panel: this.panel, server_id, ...user_data }),
        updateUser: (server_id: string, user_id: string, user_data: any) => updateUser({ apiKey: this.apiKey, panel: this.panel, server_id, user_id, ...user_data }),
        deleteUser: (server_id: string, user_id: string) => deleteUser({ apiKey: this.apiKey, panel: this.panel, server_id, user_id }),
        userDetails: (server_id: string, user_id: string) => userDetails({ apiKey: this.apiKey, panel: this.panel, server_id, user_id }),
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
        delete: (server_id: string, files: string[], root: string) => deleteFile({ apiKey: this.apiKey, panel: this.panel, server_id, files, root }),
        createFolder: (server_id: string, folder_path: string) => createFolder({ apiKey: this.apiKey, panel: this.panel, server_id, folder_path }),
        upload: (server_id: string, file_data: FormData) => uploadFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_data }),
    };
}
