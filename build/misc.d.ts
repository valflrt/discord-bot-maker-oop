export declare class Timestamp {
    private time;
    constructor();
    /**
     * Resets the timestamp
     */
    reset(): void;
    /**
     * Returns elapsed time from initialization (in milliseconds)
     */
    get elapsedTime(): number;
}
export declare let sanitize: (string: string) => string;
