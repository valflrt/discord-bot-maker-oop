import { Plugin, PluginConfig } from "./Plugin";

export interface PluginManagerConfig {
  plugins: PluginConfig[];
}

export class PluginManager {
  public plugins: Plugin[];

  constructor(config: PluginManagerConfig) {
    this.plugins = config.plugins.map((p) => new Plugin(p));
  }

  /**
   * TODO: Add client setup method
   */
}
