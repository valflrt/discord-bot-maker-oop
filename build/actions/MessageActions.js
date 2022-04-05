"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentMessageActions = exports.MessageActions = void 0;
const Base_1 = require("../Base");
class MessageActions extends Base_1.Base {
    constructor(config) {
        super(config);
        /**
         * Sends a message in the current channel
         * @param options messages options
         */
        this.send = async (options) => {
            return this.attachSentMessageActions(await this.context.message.channel.send(options));
        };
        /**
         * Replies to a message with an embed
         * @param embed embed to send
         * @param options optional – message options
         */
        this.sendEmbed = async (embed, options = {}) => {
            if (!options.embeds)
                options.embeds = [];
            options.embeds.push(embed);
            return this.attachSentMessageActions(await this.context.message.reply(options));
        };
        /**
         * Replies to a message with a text embed
         * @param content text to use in the embed
         * @param options optional – message options
         */
        this.sendTextEmbed = async (content, options = {}) => {
            return await this.sendEmbed(this.returnTextEmbed(content), options);
        };
        /**
         * Returns a text embed
         * @param content text to send as the description of the MessageEmbed
         */
        this.returnTextEmbed = (content) => {
            return this.context.bot.settings.baseEmbed.setDescription(content);
        };
        /**
         * Replies to a message with a custom MessageEmbed
         * @param setup callback to set up the custom embed
         * @param options optional – message options
         */
        this.sendCustomEmbed = async (setup, options = {}) => {
            return await this.sendEmbed(this.returnCustomEmbed(setup), options);
        };
        /**
         * Returns a custom embed
         * @param setup callback to set up the custom embed
         */
        this.returnCustomEmbed = (setup) => {
            return setup(this.context.bot.settings.baseEmbed);
        };
        this.embed = config.embed;
        this.context = config.context;
    }
    /**
     * Creates a new SentMessageActions object
     * @param message message which to attach to
     */
    attachSentMessageActions(message) {
        let newContext = this.context;
        newContext.message = message;
        return new SentMessageActions({
            context: newContext,
            embed: this.embed,
            bot: this.bot,
        });
    }
}
exports.MessageActions = MessageActions;
class SentMessageActions extends MessageActions {
    constructor(config) {
        super(config);
        /**
         * Edits a sent message with an embed
         * @param embed embed to edit the message with
         * @param options optional – message edit options
         */
        this.editWithEmbed = async (embed, options = {}) => {
            if (!options.embeds)
                options.embeds = [];
            options.embeds.push(embed);
            return this.attachSentMessageActions(await this.message.edit(options));
        };
        this.message = config.context.message;
    }
    /**
     * Edits a sent message with a text embed
     * @param text Text to use in the embed
     * @param options optional – message edit options
     */
    editWithTextEmbed(text, options = {}) {
        return this.editWithEmbed(this.returnTextEmbed(text), options);
    }
    /**
     * Edits a sent message with a custom embed
     * @param setup callback to set up the custom embed
     * @param options optional – message edit options
     */
    editWithCustomEmbed(setup, options = {}) {
        return this.editWithEmbed(this.returnCustomEmbed(setup), options);
    }
}
exports.SentMessageActions = SentMessageActions;
