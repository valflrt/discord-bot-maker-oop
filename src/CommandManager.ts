import Command from "./Command";

export interface CommandManagerConfig {
  commands: Command[];
}

class CommandManager {
  public commands: Command[];

  constructor(config: CommandManagerConfig) {
    this.commands = config.commands;
  }
}
