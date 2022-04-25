import { MessageEmbed } from "discord.js";
import { Bot } from "../src/Bot";

import config from "./_config.json";

import commands from "./commands";

let lejardinier = new Bot({
  settings: {
    prefix: "ljb!",
    baseEmbed: new MessageEmbed(),
  },
  intents: ["GUILD_MESSAGES", "GUILDS"],
  token: config.token,
  commands,
});

lejardinier.start();
