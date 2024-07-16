import { IUidGenerator } from "./IUidGenerator";
import { EnhancedTimeProvider } from "../EnhancedTimeProvider";
import { executeUnsafe, isUndefinedNullOrEmptyString } from "../utilities";

const UNIQUE_CONSTANT: number = 37951;
const INITIAL_COUNT: number = 1;
const MINIMUM_RANDOM_VALUE: number = 10000;
const MAXIMUM_RANDOM_VALUE: number = 99999;
const UID_GENERATOR_COUNT_KEY: string = 'uidGeneratorCount';

export class UidGenerator implements IUidGenerator {

  private count: bigint;
  private static readonly uidGenerator: IUidGenerator = new UidGenerator();

  private constructor() {
    this.count = UidGenerator.initializeCount();
  }

  private getCountAndIncrement(): bigint {
    // saving the current value of count...
    const count = this.count;

    // incrementing the count...
    ++this.count;

    // WARNING: 'localStorage' could be 'undefined'...
    executeUnsafe(() => {
      // writing count to local storage...
      window.localStorage.setItem(UID_GENERATOR_COUNT_KEY, this.count.toString());
    });

    // returning the value of count before increment...
    return count;
  }

  public generate(): string {
    // getting and incrementing the count...
    const count = this.getCountAndIncrement();
    // then we shall generate a random value within the pre-defined range...
    const randomValue = UidGenerator.generateRandomNumberInRange(MINIMUM_RANDOM_VALUE, MAXIMUM_RANDOM_VALUE);
    // taking the enhanced current system time (in milliseconds)...
    const enhancedCurrentTimeInMilliseconds = EnhancedTimeProvider.getCurrentTimeInMilliseconds();
    // appending all the values to prepare a unique ID...
    const uid = "" + randomValue + count + (UNIQUE_CONSTANT + enhancedCurrentTimeInMilliseconds);

    // returning the unique ID...
    return uid;
  }

  private static initializeCount(): bigint {
    // WARNING: 'localStorage' could be 'undefined'...
    const count: string | null = executeUnsafe(() => {
      // reading count from local storage...
      const count = window.localStorage.getItem(UID_GENERATOR_COUNT_KEY);

      // returning the count...
      return count;
    });

    // if count is undefined, null or an empty string,
    // we shall return a new big integer with the initial count value...
    if (isUndefinedNullOrEmptyString(count)) { return BigInt(INITIAL_COUNT); }

    try {
      // otherwise, we shall create a new big integer with
      // the count value read from the local storage...
      return BigInt(count!);
    } catch (error) {
      console.error('An error occurred while converting \'' + count + '\' to big integer.', error);
    }

    // otherwise, we shall return a new big integer with the initial count value...
    return BigInt(INITIAL_COUNT);
  }

  private static generateRandomNumberInRange(minimum: number, maximum: number): number {
    return Math.floor((Math.random() * (maximum - minimum + 1)) + minimum);
  }

  public static getInstance(): IUidGenerator {
    return this.uidGenerator;
  }
}
