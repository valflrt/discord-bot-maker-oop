export type AnyObject = { [key: string]: any };

export class TimeStamp {
  private time: number;

  constructor() {
    this.time = Date.now();
  }

  /**
   * Resets the timestamp
   */
  public reset() {
    this.time = Date.now();
  }

  /**
   * Returns elapsed time from initialization (in milliseconds)
   */
  public get elapsedTime(): number {
    return Date.now() - this.time;
  }
}
