import { Client, IntentsString } from "discord.js";

import CommandManager from "./CommandManager";
import Command from "./Command";

import { AnyObject } from "./misc";

export interface BotConfig {
  token: string;

  prefix?: string;
  constants?: AnyObject;

  intents: IntentsString[];

  commands?: Command[];
}

export default class Bot {
  public prefix: string;
  public constants: AnyObject;

  private token: string;

  private _client: Client;
  private _commandManager: CommandManager;

  constructor(config: BotConfig) {
    this.token = config.token;

    this.prefix = config.prefix ?? "!";
    this.constants = config.constants ?? {};

    this._client = new Client({ intents: config.intents });

    this._commandManager = new CommandManager({
      commands: config.commands ?? [],
    });
  }

  public start() {
    this._client.login(this.token);
    this._client.on("messageCreate", () => {});
  }
}
