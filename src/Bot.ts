import { Client, IntentsString } from "discord.js";

import { CommandManager } from "./CommandManager";
import { CommandConfig } from "./Command";

import { AnyObject, TimeStamp } from "./misc";

export interface BotConfig {
  token: string;

  prefix?: string;
  constants?: AnyObject;

  intents: IntentsString[];

  commands?: CommandConfig[];
}

export interface BotDeclaration {
  prefix: string;
  constants: AnyObject;

  start: () => Promise<void>;
}

export class Bot implements BotDeclaration {
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
      prefix: this.prefix,
      commands: config.commands ?? [],
    });
  }

  public async start() {
    console.log("Connecting...");
    let timestamp = new TimeStamp();
    await this._client.login(this.token);
    console.log(`Successfully connected (in ${timestamp.elapsedTime}ms)`);

    console.log("Waiting for the bot to be ready...");
    timestamp.reset();
    await new Promise((r) => this._client.on("ready", r));
    console.log(`The bot is now ready (took ${timestamp.elapsedTime}ms)`);

    this._client.on("messageCreate", (message) => {
      // Skips if the message doesn't start with the prefix
      if (!message.content.startsWith(this.prefix)) return;

      let command = this._commandManager.parseTextAndFindCommand(
        message.content
      );
      // Skips if no command has been found
      if (!command) return;

      command.execute(
        {
          message,
        },
        this
      );
    });
  }
}
