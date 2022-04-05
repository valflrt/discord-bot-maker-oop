import { Bot } from "../Bot";
import { Context } from "../Context";
export declare type CommandExecutionFunction = (context: Context, bot: Bot) => Promise<any>;
export interface CommandConfig {
    identifier?: string;
    name: string;
    description: string;
    aliases?: string[];
    execution: CommandExecutionFunction;
    parent?: Command;
    commands?: CommandConfig[];
}
export interface CommandDeclaration {
    identifier?: string;
    name: string;
    description: string;
    aliases: string[];
    execute: CommandExecutionFunction;
    parent: Command | null;
    commands: Command[];
}
export declare class Command implements CommandDeclaration {
    identifier: string;
    name: string;
    description: string;
    aliases: string[];
    execute: CommandExecutionFunction;
    parent: Command | null;
    commands: Command[];
    constructor(declaration: CommandConfig);
    /**
     * Returns true if a command equals an other using identifier (also matches aliases)
     * @param identifier other command identifier
     */
    equals(identifier: string): boolean;
    toJSON(): CommandDeclaration;
}
