import { Snowyflake } from "snowyflake";

const BudgrEpoch = 1748750400n;

const generator = new Snowyflake({
    workerId: 0xbfafn,
    epoch: BudgrEpoch
});

/**
 * Generates a unique snowflake identifier.
 */
export function generateSnowflake(): string {
    return generator.nextId().toString();
}
