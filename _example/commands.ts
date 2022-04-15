import { CommandConfig } from "../src/Command";

let TestCommand: CommandConfig = {
  name: "ping",
  description: 'A simple test command, replies "Pong !"',

  execution: async ({ message }) => {
    message.channel.send("Pong !");
  },
};

export default [TestCommand];
