import { Message, MessageEditOptions, MessageEmbed, MessagePayload, ReplyMessageOptions } from "discord.js";
import { Base, BaseConfig } from "../Base";
import { Context } from "../Context";
export interface MessageActionsConfig extends BaseConfig {
    context: Context;
    embed: MessageEmbed;
}
export declare class MessageActions extends Base {
    protected embed: MessageEmbed;
    protected context: Context;
    constructor(config: MessageActionsConfig);
    /**
     * Sends a message in the current channel
     * @param options messages options
     */
    send: (options: string | MessagePayload | ReplyMessageOptions) => Promise<SentMessageActions>;
    /**
     * Replies to a message with an embed
     * @param embed embed to send
     * @param options optional – message options
     */
    sendEmbed: (embed: MessageEmbed, options?: ReplyMessageOptions) => Promise<SentMessageActions>;
    /**
     * Replies to a message with a text embed
     * @param content text to use in the embed
     * @param options optional – message options
     */
    sendTextEmbed: (content: string, options?: ReplyMessageOptions) => Promise<SentMessageActions>;
    /**
     * Returns a text embed
     * @param content text to send as the description of the MessageEmbed
     */
    returnTextEmbed: (content: string) => MessageEmbed;
    /**
     * Replies to a message with a custom MessageEmbed
     * @param setup callback to set up the custom embed
     * @param options optional – message options
     */
    sendCustomEmbed: (setup: (embed: MessageEmbed) => MessageEmbed, options?: ReplyMessageOptions) => Promise<SentMessageActions>;
    /**
     * Returns a custom embed
     * @param setup callback to set up the custom embed
     */
    returnCustomEmbed: (setup: (embed: MessageEmbed) => MessageEmbed) => MessageEmbed;
    /**
     * Creates a new SentMessageActions object
     * @param message message which to attach to
     */
    protected attachSentMessageActions(message: Message): SentMessageActions;
}
export declare class SentMessageActions extends MessageActions {
    message: Message;
    constructor(config: MessageActionsConfig);
    /**
     * Edits a sent message with an embed
     * @param embed embed to edit the message with
     * @param options optional – message edit options
     */
    editWithEmbed: (embed: MessageEmbed, options?: MessageEditOptions) => Promise<SentMessageActions>;
    /**
     * Edits a sent message with a text embed
     * @param text Text to use in the embed
     * @param options optional – message edit options
     */
    editWithTextEmbed(text: string, options?: MessageEditOptions): Promise<SentMessageActions>;
    /**
     * Edits a sent message with a custom embed
     * @param setup callback to set up the custom embed
     * @param options optional – message edit options
     */
    editWithCustomEmbed(setup: (embed: MessageEmbed) => MessageEmbed, options?: MessageEditOptions): Promise<SentMessageActions>;
}
