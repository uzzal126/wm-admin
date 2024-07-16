const UNIX_EPOCH_YEAR: number = 1970;
const ENHANCED_EPOCH_YEAR: number = 2024;
const EPOCH_DIFFERENCE_IN_YEARS: number = ENHANCED_EPOCH_YEAR - UNIX_EPOCH_YEAR;
const EPOCH_DIFFERENCE_IN_MILLISECONDS: number = EPOCH_DIFFERENCE_IN_YEARS * 365 * 24 * 60 * 60 * 1000;

export class EnhancedTimeProvider {

  /**
   * Returns the epoch difference (in milliseconds)
   * between the unix epoch year and the enhanced epoch year.
   * @return The epoch difference in milliseconds.
   */
  public static getEpochDifferenceInMilliseconds(): number {
    return EPOCH_DIFFERENCE_IN_MILLISECONDS;
  }

  /**
   * Returns the current time in milliseconds (enhanced).
   * Note: This is an enhanced version of the Date.now() method
   * which measures the time difference between the current time
   * and midnight, January 1, 2024 UTC.
   * @return The difference, measured in milliseconds,
   * between the current time and midnight, January 1, 2024 UTC.
   */
  public static getCurrentTimeInMilliseconds(): number {
    // getting the current time in milliseconds...
    const currentTimeInMilliseconds = Date.now();
    // converts the current unix time in milliseconds into enhanced time...
    const enhancedCurrentTimeInMilliseconds = this.fromUnixTimeInMilliseconds(currentTimeInMilliseconds);

    // finally we shall return the enhanced current time in milliseconds...
    return enhancedCurrentTimeInMilliseconds;
  }

  /**
   * Converts the given enhanced time in milliseconds
   * into the unix time in milliseconds.
   * @param enhancedTimeInMilliseconds Enhanced time in milliseconds to convert.
   * @return Unix time in milliseconds.
   */
  public static toUnixTimeInMilliseconds(enhancedTimeInMilliseconds: number): number {
    return enhancedTimeInMilliseconds + EPOCH_DIFFERENCE_IN_MILLISECONDS;
  }

  /**
   * Converts the given unix time in milliseconds
   * into enhanced time in milliseconds.
   * @param unixTimeInMilliseconds Unix time in milliseconds to convert.
   * @return Enhanced time in milliseconds.
   */
  public static fromUnixTimeInMilliseconds(unixTimeInMilliseconds: number): number {
    return unixTimeInMilliseconds - EPOCH_DIFFERENCE_IN_MILLISECONDS;
  }
}
