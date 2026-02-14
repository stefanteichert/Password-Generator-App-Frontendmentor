import type { PasswordSettings } from "../types";

const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+~|}{[]:;?><,./-=";


export const generatePassword = (settings: PasswordSettings): string => {
  let characterPool = "";
  const passwordArray: string[] = [];

  if (settings.uppercase) {
    characterPool += UPPERCASE_CHARS;
    passwordArray.push(UPPERCASE_CHARS[Math.floor(Math.random() * UPPERCASE_CHARS.length)]);
  }
  if (settings.lowercase) {
    characterPool += LOWERCASE_CHARS;
    passwordArray.push(LOWERCASE_CHARS[Math.floor(Math.random() * LOWERCASE_CHARS.length)]);
  }
  if (settings.numbers) {
    characterPool += NUMBER_CHARS;
    passwordArray.push(NUMBER_CHARS[Math.floor(Math.random() * NUMBER_CHARS.length)]);
  }
  if (settings.symbols) {
    characterPool += SYMBOL_CHARS;
    passwordArray.push(SYMBOL_CHARS[Math.floor(Math.random() * SYMBOL_CHARS.length)]);
  }

  if (characterPool.length === 0) return "";

  for (let i = passwordArray.length; i < settings.length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    passwordArray.push(characterPool[randomIndex]);
  }

  return shuffleArray(passwordArray).join("");
};

const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};