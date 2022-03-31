import { Client, Message, MessageEmbed } from "discord.js";

import { MessageActions } from "./actions/MessageActions";
import { Command } from "./commands/Command";
import { sanitize } from "./misc";

export interface ContextConfig {
  message: Message;
  prefix: string;
  command: Command | null;
}

export class Context {
  public message: Message;
  public actions: MessageActions;
  public parameters: string;

  constructor(config: ContextConfig) {
    this.message = config.message;
    this.parameters = sanitize(
      // removes the prefix in the command call text
      this.message.content.replace(
        new RegExp(`^((?:${config.prefix}\\w+)(\\.\\w*)* *)`, "g"),
        ""
      )
    );
    this.actions = new MessageActions({ context: this, embed: this.embed });
  }

  /**
   * Returns a new preformatted MessageEmbed
   */
  get embed(): MessageEmbed {
    return new MessageEmbed()
      .setAuthor({
        name: lejardinier.client.user!.username,
        iconURL:
          "https://media.discordapp.net/attachments/749765499998437489/823241819801780254/36fb6d778b4d4a108ddcdefb964b3cc0.webp",
      })
      .setFooter(this.command ? { text: this.command.namespace } : null)
      .setColor("#49a013")
      .setTimestamp();
  }

  /**
   * Executes the current command and returns a Promise
   */
  public async execute(): Promise<void> {
    if (!this.command) return logger.log(`Command does not exist`, "error");

    await this.message.channel.sendTyping();

    try {
      await this.command!.execution(this);
      logPresets.COMMAND_EXECUTION_SUCCESS(this.command!);
    } catch (e) {
      logPresets.COMMAND_EXECUTION_FAILURE(this.command!, e);
      this.actions.sendCustomEmbed((embed) =>
        embed
          .setDescription(
            `${reactions.error.random} An error occurred while executing this command:\n`.concat(
              codeBlock(`${e}`)
            )
          )
          .setColor("RED")
      );
      throw e;
    }
  }
}
