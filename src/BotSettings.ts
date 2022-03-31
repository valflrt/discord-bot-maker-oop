import { MessageEmbed } from "discord.js";

export interface BotSettingsConfig {
  prefix?: string;
  baseEmbed?: MessageEmbed;
}

export class BotSettings {
  prefix: string;
  baseEmbed: MessageEmbed;

  constructor(config: BotSettingsConfig) {
    this.prefix = config.prefix ?? "!";
    this.baseEmbed = config.baseEmbed ?? new MessageEmbed();
  }
}
