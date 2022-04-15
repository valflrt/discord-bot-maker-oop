import { Bot } from "../src/Bot";

import commands from "./commands";

import config from "./config";

let lejardinier = new Bot({
  token: config.token,
  intents: ["GUILDS", "GUILD_MESSAGES"],

  prefix: "ljb!",

  commands,
});

lejardinier.start();
