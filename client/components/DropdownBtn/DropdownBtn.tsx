import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import s from './DropdownBtn.module.css';

interface DropdownBtnProps {
  title: string;
  items: Array<string>;
}

const DropdownBtn: React.FC<DropdownBtnProps> = ({ title, items }) => {

  const [chosen, setChosen] = useState<string>(title);

  return (
    <DropdownButton id="dropdown-basic-button" title={chosen} variant="outline-primary" className={s.btn}>
      {items.map((item, i) => (
        <Dropdown.Item key={i} onClick={()=>setChosen(item)}>{item}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropdownBtn;
