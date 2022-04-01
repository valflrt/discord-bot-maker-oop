import { Client, ClientEvents } from "discord.js";

import { Plugin, PluginEventListenerNotGeneric, PluginSetup } from "./Plugin";

import { Base, BaseConfig } from "../Base";

export interface PluginManagerConfig extends BaseConfig {
  plugins: PluginSetup[];
}

export class PluginManager extends Base {
  public plugins: Plugin[] = [];

  constructor(config: PluginManagerConfig) {
    super(config);
    config.plugins.forEach((p) => this.add(p));
  }

  /**
   * Adds a plugin from a PluginSetup
   * @param setup plugin setup
   */
  public add(setup: PluginSetup) {
    this.plugins.push(new Plugin(setup(this.bot)));
  }

  /**
   * Sets up a client: add all the event listeners of the plugin to the client
   * @param client client to set up
   */
  public setupClient(client: Client) {
    return new Promise<void>((resolve) => {
      this.plugins.forEach((p) => {
        p.iterateThroughListeners((eventType, eventName, listener) => {
          let args: [keyof ClientEvents, PluginEventListenerNotGeneric] = [
            eventName,
            listener as PluginEventListenerNotGeneric,
          ];
          if (eventType === "on") client.on(...args);
          else if (eventType === "once") client.once(...args);
          else if (eventType === "off") client.off(...args);
        });
      });
      resolve();
    });
  }
}
