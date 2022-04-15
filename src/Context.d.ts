import { Message } from "discord.js";
import { Base, BaseConfig } from "./Base";
import { MessageActions } from "./actions/MessageActions";
import { Command } from "./commands/Command";
export interface ContextConfig extends BaseConfig {
    message: Message;
    command: Command | null;
}
export declare class Context extends Base {
    message: Message;
    actions: MessageActions;
    parameters: string;
    constructor(config: ContextConfig);
}
