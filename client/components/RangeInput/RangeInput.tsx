import { ChangeEvent, useState } from "react";
import s from './RangeInput.module.css';

interface RangeInputProps {
  min: number;
  max: number;
  step: number;
  title: string;
  start: number;
}

const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  step,
  title,
  start,
}) => {

    const [price, setPrice] = useState(start);

    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
      setPrice(Number(e.target.value));
    };

  return (
    <div className={s.wrapper}>
        <label htmlFor="range" className='me-1'>{title}</label>
        <input
          type="range"
          style={{ cursor: "pointer" }}
          id="range"
          min={min}
          max={max}
          step={step}
          value={price}
          onChange={handlePrice}
        />
        <div className='ms-1'>0 - {price} грн.</div>
      </div>
  );
};

export default RangeInput;
