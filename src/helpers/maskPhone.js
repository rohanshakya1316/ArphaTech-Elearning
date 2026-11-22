/**
 * Mask a phone number for display.
 * Keeps the first 4 and last 3 characters, e.g. "9841234567" -> "9841***567".
 * Safe to call with an already masked value or an empty/missing number.
 */
export const maskPhone = (phone) => {
  if (!phone) return "";

  const value = String(phone);

  // Already masked (e.g. if the API starts returning a masked value)
  if (value.includes("*")) return value;

  if (value.length <= 7) {
    return "*".repeat(value.length);
  }

  return `${value.slice(0, 4)}${"*".repeat(value.length - 7)}${value.slice(-3)}`;
};
