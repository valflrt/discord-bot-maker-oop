"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitize = exports.Timestamp = void 0;
class Timestamp {
    constructor() {
        this.time = Date.now();
    }
    /**
     * Resets the timestamp
     */
    reset() {
        this.time = Date.now();
    }
    /**
     * Returns elapsed time from initialization (in milliseconds)
     */
    get elapsedTime() {
        return Date.now() - this.time;
    }
}
exports.Timestamp = Timestamp;
let sanitize = (string) => string
    /**
     * the two following lines remove accented characters
     * (found it on stack overflow TvT)
     */
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
exports.sanitize = sanitize;
