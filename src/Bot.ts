import { Client, IntentsString } from "discord.js";

import { AnyObject } from "./misc";

export interface BotConfig {
  token: string;
  constants?: AnyObject;

  intents: IntentsString[];
}

export default class Bot {
  private token: string;

  public constants: AnyObject;

  private _client: Client;
  private _commandManager: any;

  constructor(config: BotConfig) {
    this.token = config.token;
    this.constants = config.constants ?? {};

    this._client = new Client({ intents: config.intents });
  }

  public start() {
    return;
  }
}
