import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import s from "./DropdownBtnWithColor.module.css";
import { useState } from "react";
import { Maybe } from "graphql/jsutils/Maybe";

interface DropdownBtnWithColorProps {
  title: string;
  items: Maybe<{ id: string; name: string; cssName: string }>[];
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
      <Dropdown.Item onClick={() => setChosen("Все")}>
        <div className={s.color} style={{ display: "none" }}></div>
        {"Все"}
      </Dropdown.Item>
      {items &&
        items.length > 0 &&
        items.map((item) => (
          <Dropdown.Item key={item?.id} onClick={() => setChosen(item!.name!)}>
            <div
              className={s.color}
              style={{ backgroundColor: item?.cssName }}
            ></div>
            {item?.name}
          </Dropdown.Item>
        ))}
    </DropdownButton>
  );
};

export default DropdownBtnWithColor;
