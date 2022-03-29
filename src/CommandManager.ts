import Command from "./Command";

export interface CommandManagerConfig {
  commands: Command[];
}

export default class CommandManager {
  public commands: Command[];

  constructor(config: CommandManagerConfig) {
    this.commands = config.commands;
  }

  /**
   * Finds and returns a command in the list using a "command pattern"
   * If the command isn't found, returns null
   * @param pattern command call pattern
   */
  public find(pattern: string[]): Command | null {
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
