import { MessageEmbed } from "discord.js";
export interface BotSettingsConfig {
    prefix?: string;
    baseEmbed?: MessageEmbed;
}
export declare class BotSettings {
    prefix: string;
    baseEmbed: MessageEmbed;
    constructor(config: BotSettingsConfig);
}
