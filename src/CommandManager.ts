import { Command, CommandConfig } from "./Command";

export interface CommandManagerConfig {
  prefix: string;
  commands: CommandConfig[];
}

export class CommandManager {
  public commands: Command[];

  private _prefix: string;

  constructor(config: CommandManagerConfig) {
    this._prefix = config.prefix;
    this.commands = config.commands.map((c) => new Command(c));
  }

  /**
   * Parses the given text (message content), finds and returns a command in the list
   * using a "command pattern" If the command isn't found, returns null
   * @param text text to parse
   */
  public parseTextAndFindCommand(text: string): Command | null {
    let pattern = text
      .replace(new RegExp(`(^${this._prefix})|( .*$)`, "g"), "")
      .trim()
      .split(/(?!^)\.(?!$)/g);
    const loop = (currentLevel: Command[] = [], i: number): Command | null => {
      let command = currentLevel.find((c) => c.equals(pattern[i]));
      if (i === pattern.length - 1 && command) return command!;
      else if (command && command.commands.length !== 0) {
        return loop(command.commands, i + 1);
      } else return null;
    };

    return loop(this.commands, 0);
  }
}
