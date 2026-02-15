import { describe, it, expect } from 'vitest';
import type { PasswordSettings } from '../types';
import { calculatePasswordStrength } from './strength';

const createSettings = (length: number, activeOptionsCount: number): PasswordSettings => {
  return {
    length,
    uppercase: activeOptionsCount >= 1,
    lowercase: activeOptionsCount >= 2,
    numbers: activeOptionsCount >= 3,
    symbols: activeOptionsCount >= 4,
  };
};

describe('calculateStrength()', () => {

  describe('Matrix-Tests: combination of length and options', () => {

    //[character length, count active options, expected score]
    it.each([
      [5, 1, 1], [9, 1, 2], [12, 1, 3], [16, 1, 4],

      [5, 2, 1], [8, 2, 2], [11, 2, 3], [15, 2, 4],

      [5, 3, 1], [8, 3, 2], [11, 3, 3], [15, 3, 4],

      [4, 4, 1], [7, 4, 2], [10, 4, 3], [15, 4, 4],
    ])(
      'should return for character length = %i and count = %i active options the expected score = %i',
      (length, optionsCount, expectedScore) => {

        const settings = createSettings(length, optionsCount);

        const result = calculatePasswordStrength(settings);

        expect(result).toBe(expectedScore);
      }
    );
  });

  describe('Edge Cases', () => {
    it('should return 0 if no options are selected', () => {
      const settings = createSettings(10, 0);
      expect(calculatePasswordStrength(settings)).toBe(0);
    });
    it('should handle negative lengths gracefully as Too Weak = score (1)', () => {
      const settings = createSettings(-10, 1);
      expect(calculatePasswordStrength(settings)).toBe(1);
    });

    it('should handle extremely large lengths as strong = score (4)', () => {
      const settings = createSettings(9999, 4);
      expect(calculatePasswordStrength(settings)).toBe(4);
    });
  });
});