import { ClientEvents } from "discord.js";
import { Bot } from "../Bot";
import { EventTypes } from "../types";
export declare type PluginEventListener<EventName extends keyof ClientEvents> = (...args: ClientEvents[EventName]) => Promise<any> | any;
export declare type PluginEventListenerNotGeneric = (...args: ClientEvents[keyof ClientEvents]) => Promise<any> | any;
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
export declare type PluginEvents = {
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
export declare type PluginSetup = (bot: Bot) => PluginConfig;
export interface PluginDeclaration {
    name: string;
    events: PluginEvents;
}
/**
 * Plugin class, used to create plugins
 */
export declare class Plugin implements PluginDeclaration {
    name: string;
    events: PluginEvents;
    constructor(config: PluginConfig);
    iterateThroughListeners(callback: <EventName extends keyof ClientEvents>(eventType: EventTypes, eventName: EventName, listener: PluginEventListener<EventName>) => any): void;
    toJSON(): PluginDeclaration;
}
export declare const createPlugin: (config: (bot: Bot) => PluginConfig) => (bot: Bot) => PluginConfig;
