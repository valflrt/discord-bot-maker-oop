export interface RequiredLogSequencesDeclaration {
  STARTING: () => any;
  STARTED: (timeSpent: number) => any;
  CONNECTING: () => any;
  CONNECTED: (timeSpent: number) => any;
  READYING: () => any;
  READY: (timeSpent: number) => any;
  PLUGINS_LOADED: () => any;
}

export type LogSequencesDeclaration = Partial<RequiredLogSequencesDeclaration>;

export class LogSequences implements RequiredLogSequencesDeclaration {
  public STARTING: () => any;
  public STARTED: (timeSpent: number) => any;
  public CONNECTING: () => any;
  public CONNECTED: (timeSpent: number) => any;
  public READYING: () => any;
  public READY: (timeSpent: number) => any;
  public PLUGINS_LOADED: () => any;

  constructor(declaration: LogSequencesDeclaration) {
    this.STARTING =
      declaration.STARTING ?? (() => console.log("› Starting..."));
    this.STARTED =
      declaration.STARTED ??
      ((timeSpent) => console.log(`\n› Started ! (in ${timeSpent}ms)\n`));
    this.CONNECTING =
      declaration.CONNECTING ?? (() => console.log("  - Connecting..."));
    this.CONNECTED =
      declaration.CONNECTED ??
      ((timeSpent) =>
        console.log(`    Successfully connected ! (in ${timeSpent}ms)`));
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
