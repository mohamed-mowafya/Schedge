export const toSnakeCase = (str: string): string => {
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .toLowerCase();
};

export const convertKeysToSnakeCase = (obj: unknown): unknown => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToSnakeCase);
  }

  const converted: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = toSnakeCase(key);
    converted[snakeKey] = convertKeysToSnakeCase(value);
  }
  return converted;
};

// Utility function to convert snake_case to camelCase
export const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z]+)/g, (_, word) => {
    const upperCaseWords = ['uuid'];
    if (upperCaseWords.includes(word.toLowerCase())) {
      return word.toUpperCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
};

// Utility function to convert object keys to camelCase
export const convertKeysToCamelCase = (obj: unknown): unknown => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  }

  const converted: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const camelKey = toCamelCase(key);
    converted[camelKey] = convertKeysToCamelCase(value);
  }
  return converted;
};