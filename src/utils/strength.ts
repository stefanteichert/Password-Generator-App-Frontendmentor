import type { PasswordSettings } from "../types";


export const calculatePasswordStrength = (settings: PasswordSettings) => {
  const { length } = settings;

  const activeOptionsCount = Object.entries(settings).filter(
    ([key, value]) => key !== 'length' && value === true
  ).length;

  if (activeOptionsCount === 0) return 0;

  switch (activeOptionsCount) {
    case 1:
      if (length <= 7) return 1;
      if (length <= 10) return 2;
      if (length <= 14) return 3;
      return 4;

    case 2:
      if (length <= 7) return 1;
      if (length <= 9) return 2;
      if (length <= 12) return 3;
      return 4;

    case 3:
      if (length <= 6) return 1;
      if (length <= 9) return 2;
      if (length <= 13) return 3;
      return 4;

    case 4:
      if (length <= 5) return 1;
      if (length <= 8) return 2;
      if (length <= 12) return 3;
      return 4;

    default:
      return 0;
  }
};