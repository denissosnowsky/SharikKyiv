export const sumOfObjectValues = (counters: Record<string, number>) => {
  return Object.values(counters).reduce((a, b) => a + b);
};
