import { Command, CommandConfig } from "./Command";
export interface CommandManagerConfig {
    prefix: string;
    commands: CommandConfig[];
}
export declare class CommandManager {
    commands: Command[];
    private _prefix;
    constructor(config: CommandManagerConfig);
    /**
     * Parses the given text (message content), finds and returns a command in the list
     * using a "command pattern" If the command isn't found, returns null
     * @param text text to parse
     */
    parseTextAndFindCommand(text: string): Command | null;
}
