"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const Base_1 = require("./Base");
const MessageActions_1 = require("./actions/MessageActions");
const misc_1 = require("./misc");
class Context extends Base_1.Base {
    constructor(config) {
        super(config);
        this.message = config.message;
        this.parameters = (0, misc_1.sanitize)(
        // removes the prefix in the command call text
        this.message.content.replace(new RegExp(`^((?:${this.bot.settings.prefix}\\w+)(\\.\\w*)* *)`, "g"), ""));
        this.actions = new MessageActions_1.MessageActions({
            context: this,
            embed: this.bot.settings.baseEmbed,
            bot: this.bot,
        });
    }
}
exports.Context = Context;
