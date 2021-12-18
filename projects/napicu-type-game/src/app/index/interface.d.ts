/**
 * Data to be printed out
 */
export declare interface exportDataIn {
  /**
   * Number of incorrect words
   */
  wrongWords: number;
  /**
   * Number of incorrect letters
   */
  wrongLetters: number;
  /**
   * Number of letters
   */
  letters: number;
  /**
   * Number of words
   */
  words: number;
}

export declare interface words {
  /**
   * The Word
   */
  value: string;
  /**
   * Determine if the word is misspelled.
   */
  mistake: boolean;
  letters: wordsLetter[];
}
export declare type inputValueIn = string | null;

export declare interface wordsLetter {
  mistake: boolean | null;
  value: string;
}
