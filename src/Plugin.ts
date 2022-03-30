import { randomUUID } from "crypto";
import { ClientEvents, Message } from "discord.js";

export type PluginEvents = {
  [T in keyof ClientEvents]: ((
    ...args: ClientEvents[T]
  ) => Promise<any> | any)[];
};

export interface PluginConfig {
  name: string;
  events: PluginEvents;
}

export interface PluginDeclaration {
  id: string;
  name: string;

  events: PluginEvents;
}

export class Plugin implements PluginDeclaration {
  id: string;
  name: string;

  events: PluginEvents;

  constructor(config: PluginConfig) {
    this.id = randomUUID();
    this.name = config.name;
    this.events = config.events ?? {};
  }
}
