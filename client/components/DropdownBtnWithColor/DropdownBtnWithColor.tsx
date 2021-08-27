import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import s from "./DropdownBtnWithColor.module.css";
import { useState } from "react";

interface DropdownBtnWithColorProps {
  title: string;
  items: Array<{ text: string; color: string }>;
}

const DropdownBtnWithColor: React.FC<DropdownBtnWithColorProps> = ({
  title,
  items,
}) => {
  const [chosen, setChosen] = useState<string>(title);

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={chosen}
      variant="outline-primary"
      className={s.btn}
    >
      <Dropdown.Item onClick={() => setChosen('Все')}>
        <div className={s.color} style={{ display: 'none' }}></div>
        {'Все'}
      </Dropdown.Item>
      {items.map((item, i) => (
        <Dropdown.Item key={i} onClick={() => setChosen(item.text)}>
          <div
            className={s.color}
            style={{ backgroundColor: item.color }}
          ></div>
          {item.text}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropdownBtnWithColor;
