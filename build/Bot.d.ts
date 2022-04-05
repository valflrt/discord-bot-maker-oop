import { Client, IntentsString } from "discord.js";
import { CommandManager } from "./commands/CommandManager";
import { CommandConfig } from "./commands/Command";
import { PluginManager } from "./plugins/PluginManager";
import { PluginSetup } from "./plugins/Plugin";
import { BotSettings, BotSettingsConfig } from "./BotSettings";
import { LogSequences, LogSequencesDeclaration } from "./log/LogSequences";
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
export declare class Bot {
    constants: AnyObject;
    settings: BotSettings;
    private token;
    client: Client;
    commandManager: CommandManager;
    pluginManager: PluginManager;
    logSequences: LogSequences;
    constructor(config: BotConfig);
    start(): Promise<void>;
}
