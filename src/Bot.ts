import { Client, IntentsString, MessageEmbed } from "discord.js";

import { CommandManager } from "./commands/CommandManager";
import { CommandConfig } from "./commands/Command";

import { PluginManager } from "./plugins/PluginManager";
import { Plugin, PluginConfig } from "./plugins/Plugin";

import { BotSettings, BotSettingsConfig } from "./BotSettings";
import { Context } from "./Context";

import { TimeStamp } from "./misc";
import { AnyObject } from "./types";

export interface BotConfig {
  token: string;
  settings: BotSettingsConfig;
  constants?: AnyObject;

  intents: IntentsString[];

  commands?: CommandConfig[];
  plugins?: PluginConfig[];
}

export class Bot {
  public constants: AnyObject;

  public settings: BotSettings;

  private token: string;

  public client: Client;

  private _commandManager: CommandManager;
  private _pluginManager: PluginManager;

  constructor(config: BotConfig) {
    this.token = config.token;

    this.constants = config.constants ?? {};

    this.settings = new BotSettings(config.settings);

    this.client = new Client({ intents: config.intents });

    this._commandManager = new CommandManager({
      prefix: this.settings.prefix,
      commands: config.commands ?? [],
    });

    this._pluginManager = new PluginManager({
      plugins: config.plugins ?? [],
    });
  }

  public async start() {
    console.log("Connecting...");
    let timestamp = new TimeStamp();
    await this.client.login(this.token);
    console.log(`Successfully connected (in ${timestamp.elapsedTime}ms)`);

    console.log("Waiting for the bot to be ready...");
    timestamp.reset();
    await new Promise((r) => this.client.on("ready", r));
    console.log(`The bot is now ready (took ${timestamp.elapsedTime}ms)`);

    this._pluginManager.plugins.push(
      new Plugin({
        name: "CommandCallPlugin",
        events: {
          on: {
            messageCreate: [
              (message) => {
                // Skips if the message doesn't start with the prefix
                if (!message.content.startsWith(this.settings.prefix)) return;

                let command = this._commandManager.parseTextAndFindCommand(
                  message.content
                );
                // Skips if no command has been found
                if (!command) return;

                command.execute(
                  new Context({
                    message,
                    command,
                    prefix: this.settings.prefix,
                  }),
                  this
                );
              },
            ],
          },
        },
      })
    );
  }
}
