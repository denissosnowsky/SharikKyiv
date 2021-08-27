import type { NextPage } from "next";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import ListWithCounterAndPhoto from "../components/ListWithCounterAndPhoto/ListWithCounterAndPhoto";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import cs from "classnames";
import s from "../styles/Basket.module.css";
import { ChangeEvent, useState } from "react";

const db = [
  {
    name: "Букет 'Краса'",
    price: "35",
    id: "1",
    image: "/photo.jpg",
    description:
      "6 шаров красного хрома, 1 звезда красная, 1 сердце синее, 1 фольгированный автомобиль, 1 цифра 100см.",
  },
  {
    name: "Хромовый шар 30см.",
    price: "40",
    id: "2",
    image: "/photo2.jpg",
    description: "1 шар розового хрома",
  },
];

let arr = new Array(db.length);

for (let i = 0; i < db.length; i++) {
  arr[i] = {
    leftText: db[i].name,
    rightText: db[i].price,
    id: db[i].id,
    image: db[i].image,
    description: db[i].description,
  };
}

const Basket: NextPage = () => {
  const initState = {
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
  };

  const [state, setState] =
    useState<Record<string, string | number>>(initState);

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  return (
    <NavBar title="Корзина">
      <ContentLayout>
        <ListWithCounterAndPhoto measure={"грн."} data={arr} />
        <Form
          className={cs(
            [s.form],
            "d-flex",
            "align-items-center",
            "flex-column"
          )}
        >
          <div className={s.header}>Заполните данные:</div>
          <FloatingLabel
            controlId="name"
            label="Ваше имя"
            className="mb-3"
            style={{ width: "100%" }}
          >
            <Form.Control
              type="text"
              placeholder="Ваше имя"
              name="name"
              value={state.name}
              onChange={handleInputs}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="phone"
            label="Ваш телефон"
            className="mb-3"
            style={{ width: "100%" }}
          >
            <Form.Control
              type="number"
              placeholder="Ваш телефон"
              name="phone"
              value={state.phone}
              onChange={handleInputs}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="address"
            label="Адрес доставки"
            className="mb-3"
            style={{ width: "100%" }}
          >
            <Form.Control
              type="text"
              placeholder="Адрес доставки"
              name="address"
              value={state.address}
              onChange={handleInputs}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="day"
            label="Желаемый день доставки"
            className="mb-3"
            style={{ width: "100%" }}
          >
            <Form.Control
              type="date"
              placeholder="Желаемый день доставки"
              name="date"
              value={state.date}
              onChange={handleInputs}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="time"
            label="Желаемый час доставки"
            style={{ width: "100%" }}
          >
            <Form.Control
              type="time"
              placeholder="Желаемый час доставки"
              name="time"
              value={state.time}
              onChange={handleInputs}
            />
          </FloatingLabel>
          <div className={s.attention}>
            *Указаное время может быть занято, менеджер уточнит во время звонка
          </div>
          <Button variant="primary" className={s.submitBtn} onClick={()=>console.log(state)}>
            Подтвердить заказ
          </Button>
        </Form>
      </ContentLayout>
    </NavBar>
  );
};

export default Basket;
