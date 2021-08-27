export const counterStateChanger = (
  counters: Record<string, number>,
  property: string,
  value: number,
  initValue: number
) => {
  return (countersPrev = counters) => ({
    ...countersPrev,
    [property]: value * initValue,
  });
};
