import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import s from "./DropdownBtn.module.css";
import { Maybe } from "graphql/jsutils/Maybe";

interface DropdownBtnProps {
  title: string;
  items: Maybe<{id: string; name: string; }>[]
}

const DropdownBtn: React.FC<DropdownBtnProps> = ({ title, items }) => {
  const [chosen, setChosen] = useState<string>(title);

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={chosen}
      variant="outline-primary"
      className={s.btn}
    >
      {items && items.length > 0 && items.map((item) => (
        <Dropdown.Item key={item?.id} onClick={() => setChosen(item!.name!)}>
          {item?.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropdownBtn;
