import { useMemo } from "react";

type Id = {
  id: string;
};

export function useCounterInitState<T>(data: Array<T & Id>) {
  return useMemo(() => {
    const obj: Record<string, number> = {};
    for (let i = 0; i < data.length; i++) {
      obj[data[i].id] = 0;
    }
    return obj;
  }, [data]);
}
