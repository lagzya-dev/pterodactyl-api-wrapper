import Setup from "./Setup";

// Import user functions
import listUsers from "../source/app/users/listUsers";
import userDetails from "../source/app/users/userDetails";
import userDetails_externalId from "../source/app/users/userDetails_externalId";
import createUser from "../source/app/users/createUser";
import updateUser from "../source/app/users/updateUser";
import deleteUser from "../source/app/users/deleteUser";

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
        getDetails: (user_id: string) => userDetails({ apiKey: this.apiKey, panel: this.panel, user_id }),
        getDetailsByExternalId: (external_id: string) => userDetails_externalId({ apiKey: this.apiKey, panel: this.panel, external_id }),
        create: (user_details: { email: string; username: string; first_name?: string; last_name?: string }) => 
            createUser({ apiKey: this.apiKey, panel: this.panel, user_details }),        
        update: (user_id: string, user_data: any) => 
            updateUser({ apiKey: this.apiKey, panel: this.panel, user_id: parseInt(user_id), data: user_data }),        
        delete: (user_id: string) => deleteUser({ apiKey: this.apiKey, panel: this.panel, identifier: parseInt(user_id) }),
    };
}
