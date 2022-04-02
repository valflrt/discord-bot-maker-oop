import { Client, IntentsString } from "discord.js";

import { CommandManager } from "./commands/CommandManager";
import { CommandConfig } from "./commands/Command";

import { PluginManager } from "./plugins/PluginManager";
import { PluginSetup } from "./plugins/Plugin";

import { BotSettings, BotSettingsConfig } from "./BotSettings";

import commandHandlingPLugin from "./default/commandHandlingPLugin";

import { Timestamp } from "./misc";
import { AnyObject } from "./types";

export interface BotConfig {
  token: string;
  settings: BotSettingsConfig;
  constants?: AnyObject;

  intents: IntentsString[];

  commands?: CommandConfig[];
  plugins?: PluginSetup[];
}

export class Bot {
  public constants: AnyObject;

  public settings: BotSettings;

  private token: string;

  public client: Client;

  public commandManager: CommandManager;
  public pluginManager: PluginManager;

  constructor(config: BotConfig) {
    this.token = config.token;

    this.constants = config.constants ?? {};

    this.settings = new BotSettings(config.settings);

    this.client = new Client({ intents: config.intents });

    this.commandManager = new CommandManager({
      prefix: this.settings.prefix,
      commands: config.commands ?? [],
    });

    this.pluginManager = new PluginManager({
      plugins: config.plugins
        ? [commandHandlingPLugin, ...config.plugins]
        : [commandHandlingPLugin],
      bot: this,
    });
  }

  public async start() {
    console.log("Connecting...");
    let timestamp = new Timestamp();
    await this.client.login(this.token);
    console.log(`Successfully connected (in ${timestamp.elapsedTime}ms)`);

    console.log("Waiting for the bot to be ready...");
    timestamp.reset();
    await new Promise((r) => this.client.on("ready", r));
    console.log(`The bot is now ready (took ${timestamp.elapsedTime}ms)`);

    await this.pluginManager.setupClient(this.client);
    console.log(`Loaded plugins !`);
  }
}
