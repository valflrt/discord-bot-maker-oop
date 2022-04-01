import { Message } from "discord.js";

import { Base, BaseConfig } from "./Base";

import { MessageActions } from "./actions/MessageActions";

import { Command } from "./commands/Command";

import { sanitize } from "./misc";

export interface ContextConfig extends BaseConfig {
  message: Message;
  command: Command | null;
}

export class Context extends Base {
  public message: Message;
  public actions: MessageActions;
  public parameters: string;

  constructor(config: ContextConfig) {
    super(config);
    this.message = config.message;
    this.parameters = sanitize(
      // removes the prefix in the command call text
      this.message.content.replace(
        new RegExp(`^((?:${this.bot.settings.prefix}\\w+)(\\.\\w*)* *)`, "g"),
        ""
      )
    );
    this.actions = new MessageActions({
      context: this,
      embed: this.bot.settings.baseEmbed,
      bot: this.bot,
    });
  }
}
