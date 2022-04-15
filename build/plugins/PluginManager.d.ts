import { Client } from "discord.js";
import { Plugin, PluginSetup } from "./Plugin";
import { Base, BaseConfig } from "../Base";
export interface PluginManagerConfig extends BaseConfig {
    plugins: PluginSetup[];
}
export declare class PluginManager extends Base {
    plugins: Plugin[];
    constructor(config: PluginManagerConfig);
    /**
     * Adds a plugin from a PluginSetup
     * @param setup plugin setup
     */
    add(setup: PluginSetup): void;
    /**
     * Sets up a client: add all the event listeners of the plugin to the client
     * @param client client to set up
     */
    setupClient(client: Client): Promise<void>;
}
