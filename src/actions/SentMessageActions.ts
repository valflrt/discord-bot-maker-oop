import { Message, MessageEditOptions, MessageEmbed } from "discord.js";

import { MessageActions, MessageActionsConfig } from "./MessageActions";

export class SentMessageActions extends MessageActions {
  public message: Message;

  constructor(config: MessageActionsConfig) {
    super(config);
    this.message = config.context.message;
  }

  /**
   * Edits a sent message with an embed
   * @param embed embed to edit the message with
   * @param options optional – message edit options
   */
  public editWithEmbed = async (
    embed: MessageEmbed,
    options: MessageEditOptions = {}
  ): Promise<SentMessageActions> => {
    if (!options.embeds) options.embeds = [];
    options.embeds.push(embed);
    return this.attachSentMessageActions(await this.message.edit(options));
  };

  /**
   * Edits a sent message with a text embed
   * @param text Text to use in the embed
   * @param options optional – message edit options
   */
  public editWithTextEmbed(
    text: string,
    options: MessageEditOptions = {}
  ): Promise<SentMessageActions> {
    return this.editWithEmbed(this.returnTextEmbed(text), options);
  }

  /**
   * Edits a sent message with a custom embed
   * @param setup callback to set up the custom embed
   * @param options optional – message edit options
   */
  public editWithCustomEmbed(
    setup: (embed: MessageEmbed) => MessageEmbed,
    options: MessageEditOptions = {}
  ): Promise<SentMessageActions> {
    return this.editWithEmbed(this.returnCustomEmbed(setup), options);
  }
}
