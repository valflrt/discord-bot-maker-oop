"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotSettings = void 0;
const discord_js_1 = require("discord.js");
class BotSettings {
    constructor(config) {
        this.prefix = config.prefix ?? "!";
        this.baseEmbed = config.baseEmbed ?? new discord_js_1.MessageEmbed();
    }
}
exports.BotSettings = BotSettings;
