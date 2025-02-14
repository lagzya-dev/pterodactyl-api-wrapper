/**
 * The Setup class provides a way to configure global settings for the Pterodactyl API Wrapper.
 * The primary use is to set the panel URL, which is then used in all API requests.
 *
 * @example
 * Setup.setPanel("https://panel.example.com");
 * const panelUrl = Setup.getPanel();
 */
export default class Setup {
    private static panelUrl: string;

    /**
     * Sets the global panel URL.
     * @param url - The URL of the Pterodactyl panel.
     */
    public static setPanel(url: string): void {
        this.panelUrl = url;
    }

    /**
     * Gets the globally set panel URL.
     * @returns The panel URL.
     * @throws If the panel URL has not been set.
     */
    public static getPanel(): string {
        if (!this.panelUrl) {
            throw new Error("Panel URL is not set. Use Setup.setPanel(url) before making API calls.");
        }
        return this.panelUrl;
    }
}
