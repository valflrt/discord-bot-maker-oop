import { ClientEvents } from "discord.js";

import { Bot } from "../Bot";

import { EventTypes } from "../types";

export type PluginEventListener<EventName extends keyof ClientEvents> = (
  ...args: ClientEvents[EventName]
) => Promise<any> | any;

export type PluginEventListenerNotGeneric = (
  ...args: ClientEvents[keyof ClientEvents]
) => Promise<any> | any;

/**
 * PluginEvents object declaration
 *
 * Example:
 *
 * ```typescript
 * {
 *   once: {
 *     ready: async () => console.log("ready !"),
 *   },
 *   on: {
 *     messageCreate: async (message) => message.channel.send("blop"),
 *   }
 * }
 * ```
 */
export type PluginEvents = {
  [EventType in EventTypes]?: {
    [EventName in keyof ClientEvents]?: PluginEventListener<EventName>;
  };
};

/**
 * Plugin configuration declaration
 */
export interface PluginConfig {
  name: string;
  events?: PluginEvents;
}

export type PluginSetup = (bot: Bot) => PluginConfig;

export interface PluginDeclaration {
  name: string;
  events: PluginEvents;
}

/**
 * Plugin class, used to create plugins
 */
export class Plugin implements PluginDeclaration {
  public name: string;
  public events: PluginEvents;

  constructor(config: PluginConfig) {
    this.name = config.name;
    this.events = config.events ?? {};
  }

  public iterateThroughListeners(
    callback: <EventName extends keyof ClientEvents>(
      eventType: EventTypes,
      eventName: EventName,
      listener: PluginEventListener<EventName>
    ) => any
  ) {
    Object.entries(this.events).forEach(([eventType, listeners]) =>
      Object.entries(listeners).forEach(([eventName, listener]) => {
        callback(
          eventType as EventTypes,
          eventName as keyof ClientEvents,
          listener as PluginEventListenerNotGeneric
        );
      })
    );
  }

  public toJSON() {
    return this as PluginDeclaration;
  }
}

export const createPlugin = (config: (bot: Bot) => PluginConfig) => {
  return config;
};
