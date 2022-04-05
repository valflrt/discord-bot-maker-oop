"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const CommandManager_1 = require("./commands/CommandManager");
const PluginManager_1 = require("./plugins/PluginManager");
const BotSettings_1 = require("./BotSettings");
const commandHandlingPLugin_1 = __importDefault(require("./default/commandHandlingPLugin"));
const LogSequences_1 = require("./log/LogSequences");
const misc_1 = require("./misc");
class Bot {
    constructor(config) {
        this.token = config.token;
        this.constants = config.constants ?? {};
        this.settings = new BotSettings_1.BotSettings(config.settings);
        this.client = new discord_js_1.Client({ intents: config.intents });
        this.commandManager = new CommandManager_1.CommandManager({
            prefix: this.settings.prefix,
            commands: config.commands ?? [],
        });
        this.pluginManager = new PluginManager_1.PluginManager({
            plugins: config.plugins
                ? [commandHandlingPLugin_1.default, ...config.plugins]
                : [commandHandlingPLugin_1.default],
            bot: this,
        });
        this.logSequences = new LogSequences_1.LogSequences(config.logSequences ?? {});
    }
    async start() {
        let startupTS = new misc_1.Timestamp();
        let stepsTS = new misc_1.Timestamp();
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
exports.Bot = Bot;
