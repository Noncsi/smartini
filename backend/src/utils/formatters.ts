export const formatString = (string: string): string =>
  string.replace(/&quot;/g, '"').replace(/&#039;/g, "'");