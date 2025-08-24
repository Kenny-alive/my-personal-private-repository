import { getPasswordStrength } from './passwordStrength';

describe('getPasswordStrength', () => {
  it('should return 0 for empty password', () => {
    expect(getPasswordStrength('')).toBe(0);
  });

  it('should count uppercase letters', () => {
    expect(getPasswordStrength('ABC')).toBe(1);
  });

  it('should count lowercase letters', () => {
    expect(getPasswordStrength('abc')).toBe(1);
  });

  it('should count digits', () => {
    expect(getPasswordStrength('123')).toBe(1);
  });

  it('should count special characters', () => {
    expect(getPasswordStrength('!@#')).toBe(1);
  });

  it('should sum different character types', () => {
    expect(getPasswordStrength('Aabc')).toBe(2);
    expect(getPasswordStrength('Aabc1')).toBe(3);
    expect(getPasswordStrength('Aabc1!')).toBe(4);
  });

  it('should not count repeated types multiple times', () => {
    expect(getPasswordStrength('AAAaaa111!!!')).toBe(4);
  });
});
