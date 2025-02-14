import Setup from "./Setup";

// Import Application API - User Management
import listUsers from "../source/app/users/listUsers";
import userDetails from "../source/app/users/userDetails";
import userDetails_externalId from "../source/app/users/userDetails_externalId";
import createUser from "../source/app/users/createUser";
import updateUser from "../source/app/users/updateUser";
import deleteUser from "../source/app/users/deleteUser";

// Import Application API - Node Management
import listNodes from "../source/app/nodes/listNodes";
import nodeDetails from "../source/app/nodes/nodeDetails";
import nodeConfiguration from "../source/app/nodes/nodeConfiguration";
import createNode from "../source/app/nodes/createNode";
import updateNode from "../source/app/nodes/updateNode";
import deleteNode from "../source/app/nodes/deleteNode";

// Import Application API - Location Management
import listLocations from "../source/app/locations/listLocations";
import locationDetails from "../source/app/locations/locationDetails";
import createLocation from "../source/app/locations/createLocation";
import updateLocation from "../source/app/locations/updateLocation";
import deleteLocation from "../source/app/locations/deleteLocation";

// Import Application API - Server Management
import listServers from "../source/app/servers/listServers";
import serverDetails from "../source/app/servers/serverDetails";
import serverDetails_externalId from "../source/app/servers/serverDetails_externalId";
import updateDetails from "../source/app/servers/updateDetails";
import updateServerBuild from "../source/app/servers/updateServerBuild";
import updateServerStartup from "../source/app/servers/updateServerStartup";
import createServer from "../source/app/servers/createServer";
import suspendServer from "../source/app/servers/suspendServer";
import unsuspendServer from "../source/app/servers/unsuspendServer";
import reinstallServer from "../source/app/servers/reinstallServer";
import deleteServer from "../source/app/servers/deleteServer";
import forceDeleteServer from "../source/app/servers/forceDeleteServer";

// Import Application API - Nest & Egg Management
import listEggs from "../source/app/nests/eggs/listEggs";
import eggDetails from "../source/app/nests/eggs/eggDetails";
import listNests from "../source/app/nests/listNests";
import nestDetails from "../source/app/nests/nestDetails";

/**
 * The Application class provides an interface for interacting with the
 * Pterodactyl Application API. This class gives full control over the panel,
 * including user, node, location, server, and nest management.
 *
 * @example
 * const app = new Application("YOUR_API_KEY");
 * const users = await app.users.list();
 */
export default class Application {
    private apiKey: string;
    private panel: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.panel = Setup.getPanel();
    }

    /** User Management */
    public users = {
        list: () => listUsers({ apiKey: this.apiKey, panel: this.panel }),
        getDetails: (user_id: string) =>
            userDetails({ apiKey: this.apiKey, panel: this.panel, user_id }),
        getDetailsByExternalId: (external_id: string) =>
            userDetails_externalId({ apiKey: this.apiKey, panel: this.panel, external_id }),
        create: (user_details: { email: string; username: string; first_name?: string; last_name?: string }) =>
            createUser({ apiKey: this.apiKey, panel: this.panel, user_details }),
        update: (user_id: string, user_data: any) =>
            updateUser({ apiKey: this.apiKey, panel: this.panel, user_id: parseInt(user_id), data: user_data }),
        delete: (user_id: string) =>
            deleteUser({ apiKey: this.apiKey, panel: this.panel, identifier: parseInt(user_id) }),
    };

    /** Node Management */
    public nodes = {
        list: () => listNodes({ apiKey: this.apiKey, panel: this.panel }),
        getDetails: (node_id: string) =>
            nodeDetails({ apiKey: this.apiKey, panel: this.panel, node_id: parseInt(node_id) }),
        getConfiguration: (node_id: string) =>
            nodeConfiguration({ apiKey: this.apiKey, panel: this.panel, node_id: parseInt(node_id) }),
        create: (node_data: any) =>
            createNode({ apiKey: this.apiKey, panel: this.panel, node_data }),
        update: (node_id: string, node_data: any) =>
            updateNode({ apiKey: this.apiKey, panel: this.panel, node_id: parseInt(node_id), update_data: node_data }),
        delete: (node_id: string) =>
            deleteNode({ apiKey: this.apiKey, panel: this.panel, node_id: parseInt(node_id) }),
    };

    /** Location Management */
    public locations = {
        list: () => listLocations({ apiKey: this.apiKey, panel: this.panel }),
        getDetails: (location_id: string) =>
            locationDetails({ apiKey: this.apiKey, panel: this.panel, location_id: parseInt(location_id) }),
        create: (location_data: { short: string; long: string }) =>
            createLocation({ apiKey: this.apiKey, panel: this.panel, location_data }),
        update: (location_id: string, location_data: any) =>
            updateLocation({ apiKey: this.apiKey, panel: this.panel, location_id: parseInt(location_id), update_data: location_data }),
        delete: (location_id: string) =>
            deleteLocation({ apiKey: this.apiKey, panel: this.panel, location_id: parseInt(location_id) }),
    };

    /** Server Management */
    public servers = {
        list: () => listServers({ apiKey: this.apiKey, panel: this.panel }),
        getDetails: (server_id: string) =>
            serverDetails({ apiKey: this.apiKey, panel: this.panel, server_id }),
        getDetailsByExternalId: (external_id: string) =>
            serverDetails_externalId({ apiKey: this.apiKey, panel: this.panel, external_id }),
        updateDetails: (server_id: string, update_data: any) =>
            updateDetails({ apiKey: this.apiKey, panel: this.panel, server_id, update_data }),
        updateBuild: (server_id: string, build_data: any) =>
            updateServerBuild({ apiKey: this.apiKey, panel: this.panel, server_id, build_data }),
        updateStartup: (server_id: string, startup_data: any) =>
            updateServerStartup({ apiKey: this.apiKey, panel: this.panel, server_id, startup_data }),
        create: (server_data: any) =>
            createServer({ apiKey: this.apiKey, panel: this.panel, server_data }),
        suspend: (server_id: string) =>
            suspendServer({ apiKey: this.apiKey, panel: this.panel, server_id }),
        unsuspend: (server_id: string) =>
            unsuspendServer({ apiKey: this.apiKey, panel: this.panel, server_id }),
        reinstall: (server_id: string) =>
            reinstallServer({ apiKey: this.apiKey, panel: this.panel, server_id }),
        delete: (server_id: string) =>
            deleteServer({ apiKey: this.apiKey, panel: this.panel, server_id }),
        forceDelete: (server_id: string) =>
            forceDeleteServer({ apiKey: this.apiKey, panel: this.panel, server_id }),
    };

    /** Nest & Egg Management */
    public nests = {
        listNests: () => listNests({ apiKey: this.apiKey, panel: this.panel }),
        getNestDetails: (nest_id: string) =>
            nestDetails({ apiKey: this.apiKey, panel: this.panel, nest_id: parseInt(nest_id) }),
        listEggs: (nest_id: string) =>
            listEggs({ apiKey: this.apiKey, panel: this.panel, nest_id: parseInt(nest_id) }),
        getEggDetails: (nest_id: string, egg_id: string) =>
            eggDetails({ apiKey: this.apiKey, panel: this.panel, nest_id: parseInt(nest_id), egg_id: parseInt(egg_id) }),
    };
}
