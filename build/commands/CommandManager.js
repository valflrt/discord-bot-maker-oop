"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
const Command_1 = require("./Command");
class CommandManager {
    constructor(config) {
        this._prefix = config.prefix;
        this.commands = config.commands.map((c) => new Command_1.Command(c));
    }
    /**
     * Parses the given text (message content), finds and returns a command in the list
     * using a "command pattern" If the command isn't found, returns null
     * @param text text to parse
     */
    parseTextAndFindCommand(text) {
        let pattern = text
            .replace(new RegExp(`(^${this._prefix})|( .*$)`, "g"), "")
            .trim()
            .split(/(?!^)\.(?!$)/g);
        const loop = (currentLevel = [], i) => {
            let command = currentLevel.find((c) => c.equals(pattern[i]));
            if (i === pattern.length - 1 && command)
                return command;
            else if (command && command.commands.length !== 0) {
                return loop(command.commands, i + 1);
            }
            else
                return null;
        };
        return loop(this.commands, 0);
    }
}
exports.CommandManager = CommandManager;
