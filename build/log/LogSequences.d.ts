export interface RequiredLogSequencesDeclaration {
    STARTING: () => any;
    STARTED: (timeSpent: number) => any;
    CONNECTING: () => any;
    CONNECTED: (timeSpent: number) => any;
    READYING: () => any;
    READY: (timeSpent: number) => any;
    PLUGINS_LOADED: () => any;
}
export declare type LogSequencesDeclaration = Partial<RequiredLogSequencesDeclaration>;
export declare class LogSequences implements RequiredLogSequencesDeclaration {
    STARTING: () => any;
    STARTED: (timeSpent: number) => any;
    CONNECTING: () => any;
    CONNECTED: (timeSpent: number) => any;
    READYING: () => any;
    READY: (timeSpent: number) => any;
    PLUGINS_LOADED: () => any;
    constructor(declaration: LogSequencesDeclaration);
}
