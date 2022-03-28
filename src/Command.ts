import Bot from "./Bot";

export type CommandExecutionFunction = (context: any, bot: Bot) => void;

export interface CommandConfig {
  name: string;
  description: string;
  execution: CommandExecutionFunction;
}

export default class Command {
  public name: string;
  public description: string;
  public execution: CommandExecutionFunction;

  constructor(config: CommandConfig) {
    this.name = config.name;
    this.description = config.description;
    this.execution = config.execution;
  }
}
