"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const camelcase_1 = __importDefault(require("camelcase"));
class Command {
    constructor(declaration) {
        this.identifier =
            declaration.identifier ??
                (0, camelcase_1.default)(declaration.name, { pascalCase: false });
        this.name = declaration.name;
        this.description = declaration.description;
        this.aliases = declaration.aliases ?? [];
        this.execute = declaration.execution;
        this.commands = declaration.commands
            ? declaration.commands.map((c) => new Command({ ...c, parent: this }))
            : [];
        this.parent = declaration.parent ?? null;
    }
    /**
     * Returns true if a command equals an other using identifier (also matches aliases)
     * @param identifier other command identifier
     */
    equals(identifier) {
        return (this.identifier === identifier ||
            !!this.aliases.find((a) => a === identifier));
    }
    toJSON() {
        return this;
    }
}
exports.Command = Command;
