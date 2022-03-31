import { ClientEvents } from "discord.js";
import { randomUUID } from "crypto";

import { EventTypes } from "./types";

/**
 * PluginEvents object declaration
 *
 * Example:
 *
 * ```typescript
 * {
 *   once: {
 *     ready: [
 *       async () => console.log("ready !")
 *     ],
 *   },
 *   on: {
 *     messageCreate: [
 *       async (message) => message.channel.send("blop")
 *     ],
 *   }
 * }
 * ```
 */
export type PluginEvents = {
  [EventType in EventTypes]?: {
    [Event in keyof ClientEvents]?: ((
      ...args: ClientEvents[Event]
    ) => Promise<any> | any)[];
  };
};

/**
 * Plugin configuration declaration
 */
export interface PluginConfig {
  name: string;
  events?: PluginEvents;
}

export interface PluginDeclaration {
  id: string;
  name: string;

  events: PluginEvents;
}

/**
 * Plugin class, used to create plugins
 */
export class Plugin implements PluginDeclaration {
  public id: string;
  public name: string;

  public events: PluginEvents;

  constructor(config: PluginConfig) {
    this.id = randomUUID();
    this.name = config.name;
    this.events = config.events ?? {};
  }
}
