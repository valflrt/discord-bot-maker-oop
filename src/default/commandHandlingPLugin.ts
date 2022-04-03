import { Context } from "../Context";
import { createPlugin } from "../plugins/Plugin";

export default createPlugin((bot) => ({
  name: "CommandHandlingPlugin",
  events: {
    on: {
      messageCreate: (message) => {
        // Skips if the message doesn't start with the prefix
        if (!message.content.startsWith(bot.settings.prefix)) return;

        // Looks for an eventual command
        let command = bot.commandManager.parseTextAndFindCommand(
          message.content
        );
        // Skips if no command has been found
        if (!command) return;

        command.execute(
          new Context({
            message,
            command,
            bot,
          }),
          bot
        );
      },
    },
  },
}));
