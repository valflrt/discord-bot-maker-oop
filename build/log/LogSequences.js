"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogSequences = void 0;
class LogSequences {
    constructor(declaration) {
        this.STARTING = declaration.STARTING ?? (() => console.log("Starting..."));
        this.STARTED =
            declaration.STARTED ??
                ((timeSpent) => console.log(`\nStarted ! (in ${timeSpent}ms)\n`));
        this.CONNECTING =
            declaration.CONNECTING ?? (() => console.log("  - Connecting..."));
        this.CONNECTED =
            declaration.CONNECTED ??
                ((timeSpent) => console.log(`    Successfully connected ! (in ${timeSpent}ms)`));
        this.READYING =
            declaration.READYING ??
                (() => console.log("  - Waiting for the bot to be ready..."));
        this.READY =
            declaration.READY ??
                ((timeSpent) => console.log(`    Ready ! (took ${timeSpent}ms)`));
        this.PLUGINS_LOADED =
            declaration.PLUGINS_LOADED ?? (() => console.log(`  - Loaded plugins !`));
    }
}
exports.LogSequences = LogSequences;
