import camelCase from "camelcase";

import Bot from "./Bot";

export type CommandExecutionFunction = (context: any, bot: Bot) => Promise<any>;

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

  execution: CommandExecutionFunction;

  parent: Command | null;
  commands: Command[];
}

export default class Command implements CommandDeclaration {
  public identifier: string;
  public name: string;
  public description: string;

  public aliases: string[];

  public execution: CommandExecutionFunction;

  public parent: Command | null;
  public commands: Command[];

  constructor(declaration: CommandConfig) {
    this.identifier =
      declaration.identifier ??
      camelCase(declaration.name, { pascalCase: false });
    this.name = declaration.name;
    this.description = declaration.description;

    this.aliases = declaration.aliases ?? [];

    this.execution = declaration.execution;

    this.commands = declaration.commands
      ? declaration.commands.map((c) => new Command({ ...c, parent: this }))
      : [];
    this.parent = declaration.parent ?? null;
  }

  /**
   * Returns true if a command equals an other using identifier (also matches aliases)
   * @param identifier other command identifier
   */
  public equals(identifier: string): boolean {
    return (
      this.identifier === identifier ||
      !!this.aliases.find((a) => a === identifier)
    );
  }

  public toJSON(): CommandDeclaration {
    return this as CommandDeclaration;
  }
}
