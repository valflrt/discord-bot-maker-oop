"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../Context");
const Plugin_1 = require("../plugins/Plugin");
exports.default = (0, Plugin_1.createPlugin)((bot) => ({
    name: "CommandHandlingPlugin",
    events: {
        on: {
            messageCreate: (message) => {
                // Skips if the message doesn't start with the prefix
                if (!message.content.startsWith(bot.settings.prefix))
                    return;
                // Looks for an eventual command
                let command = bot.commandManager.parseTextAndFindCommand(message.content);
                // Skips if no command has been found
                if (!command)
                    return;
                command.execute(new Context_1.Context({
                    message,
                    command,
                    bot,
                }), bot);
            },
        },
    },
}));
