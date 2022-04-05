"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlugin = exports.Plugin = void 0;
/**
 * Plugin class, used to create plugins
 */
class Plugin {
    constructor(config) {
        this.name = config.name;
        this.events = config.events ?? {};
    }
    iterateThroughListeners(callback) {
        Object.entries(this.events).forEach(([eventType, listeners]) => Object.entries(listeners).forEach(([eventName, listener]) => {
            callback(eventType, eventName, listener);
        }));
    }
    toJSON() {
        return this;
    }
}
exports.Plugin = Plugin;
const createPlugin = (config) => {
    return config;
};
exports.createPlugin = createPlugin;
