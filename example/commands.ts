import { CommandConfig } from "../src/commands/Command";

let ping: CommandConfig = {
  name: "ping",
  description: "test command",
  execution: async ({ message }) => message.channel.send("Pong !"),
};

export default [ping];
