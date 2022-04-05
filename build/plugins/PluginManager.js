"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginManager = void 0;
const Plugin_1 = require("./Plugin");
const Base_1 = require("../Base");
class PluginManager extends Base_1.Base {
    constructor(config) {
        super(config);
        this.plugins = [];
        config.plugins.forEach((p) => this.add(p));
    }
    /**
     * Adds a plugin from a PluginSetup
     * @param setup plugin setup
     */
    add(setup) {
        this.plugins.push(new Plugin_1.Plugin(setup(this.bot)));
    }
    /**
     * Sets up a client: add all the event listeners of the plugin to the client
     * @param client client to set up
     */
    setupClient(client) {
        return new Promise((resolve) => {
            this.plugins.forEach((p) => {
                p.iterateThroughListeners((eventType, eventName, listener) => {
                    let args = [
                        eventName,
                        listener,
                    ];
                    if (eventType === "on")
                        client.on(...args);
                    else if (eventType === "once")
                        client.once(...args);
                    else if (eventType === "off")
                        client.off(...args);
                });
            });
            resolve();
        });
    }
}
exports.PluginManager = PluginManager;
