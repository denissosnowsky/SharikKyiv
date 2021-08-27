import { memo, useEffect, useState } from "react";

interface CounterProps {
  minValue: number;
  clb?: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({ clb, minValue }) => {
  const [count, setCount] = useState<number>(minValue);

  useEffect(() => {
    clb && clb(minValue);
  }, []);

  const handlePlus = () => {
    setCount((count) => count + 1);
    clb && clb(count + 1);
  };

  const handleMinus = () => {
    setCount((count) => (count > minValue ? count - 1 : count));
    clb && clb(count > minValue ? count - 1 : count);
  };

  return (
    <div className="counter w-50 d-flex justify-content-center">
      <i className="bi bi-dash px-2" onClick={handleMinus}></i>
      <span>{count}</span>
      <i className="bi bi-plus px-2" onClick={handlePlus}></i>
    </div>
  );
};

export default memo(Counter);
