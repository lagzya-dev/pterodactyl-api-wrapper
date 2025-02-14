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
export default class Setup {
    private static panelUrl: string;

    /**
     * Sets the global panel URL for API requests.
     * @param {string} url - The URL of the Pterodactyl panel.
     */
    public static setPanel(url: string): void {
        this.panelUrl = url;
    }

    /**
     * Retrieves the globally set panel URL.
     * @returns {string} The panel URL.
     */
    public static getPanel(): string {
        if (!this.panelUrl) {
            throw new Error("Panel URL is not set. Use `Setup.setPanel(url)` before making requests.");
        }
        return this.panelUrl;
    }
}
