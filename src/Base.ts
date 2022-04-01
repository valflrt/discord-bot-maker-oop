import { Bot } from "./Bot";

export interface BaseConfig {
  bot: Bot;
}

export class Base {
  bot: Bot;

  constructor(config: BaseConfig) {
    this.bot = config.bot;
  }
}
