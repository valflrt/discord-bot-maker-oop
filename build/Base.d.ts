import { Bot } from "./Bot";
export interface BaseConfig {
    bot: Bot;
}
export declare class Base {
    bot: Bot;
    constructor(config: BaseConfig);
}
