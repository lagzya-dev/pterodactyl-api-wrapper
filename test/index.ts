// test.ts

import ptero from "pterodactyl-api-wrapper";
const { Setup, Application, Client } = ptero;

// Set up panel
Setup.setPanel("https://panel.example.com");

// Initialize client
const client = new Client("YOUR_CLIENT_API_KEY");
const app = new Application("YOUR_APPLICATION_API_KEY");

(async () => {
    try {
        // Test account details
        const accountDetails = await client.account.getDetails();
        console.log("Account Details:", accountDetails);

        // Test listing servers
        const servers = await client.servers.list();
        console.log("Server List:", servers);

        // Test listing users (Application API)
        const users = await app.users.list();
        console.log("User List:", users);
    } catch (error) {
        console.error("Test failed:", error);
    }
})();
