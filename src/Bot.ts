import { Client, IntentsString } from "discord.js";

import { CommandManager } from "./commands/CommandManager";
import { CommandConfig } from "./commands/Command";

import { PluginManager } from "./plugins/PluginManager";
import { PluginSetup } from "./plugins/Plugin";

import { BotSettings, BotSettingsConfig } from "./BotSettings";

import commandHandlingPLugin from "./default/commandHandlingPLugin";

import { LogSequences, LogSequencesDeclaration } from "./log/LogSequences";

import { Timestamp } from "./misc";
import { AnyObject } from "./types";

export interface BotConfig {
  token: string;
  settings: BotSettingsConfig;

  constants?: AnyObject;

  intents: IntentsString[];

  commands?: CommandConfig[];
  plugins?: PluginSetup[];

  logSequences?: LogSequencesDeclaration;
}

export class Bot {
  public constants: AnyObject;

  public settings: BotSettings;

  private token: string;

  public client: Client;

  public commandManager: CommandManager;
  public pluginManager: PluginManager;

  public logSequences: LogSequences;

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

    this.logSequences = new LogSequences(config.logSequences ?? {});
  }

  public async start() {
    let startupTS = new Timestamp();
    let stepsTS = new Timestamp();

    this.logSequences.STARTING();

    this.logSequences.CONNECTING();
    stepsTS.reset();
    await this.client.login(this.token);
    this.logSequences.CONNECTED(stepsTS.elapsedTime);

    this.logSequences.READYING();
    stepsTS.reset();
    await new Promise((r) => this.client.on("ready", r));
    this.logSequences.READY(stepsTS.elapsedTime);

    await this.pluginManager.setupClient(this.client);
    this.logSequences.PLUGINS_LOADED();

    this.logSequences.STARTED(startupTS.elapsedTime);
  }
}
