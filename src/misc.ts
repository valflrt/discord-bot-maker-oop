export class Timestamp {
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

export let sanitize = (string: string) =>
  string
    /**
     * the two following lines remove accented characters
     * (found it on stack overflow TvT)
     */
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
