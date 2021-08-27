import type { NextPage } from "next";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Counter from "../components/Counter/Counter";
import s from "../styles/Calculator.module.css";
import ListWithCounter from "../components/ListWithCounter/ListWithCounter";

const db = [
  {
    name: "Латексный шар 30см.",
    price: "35",
    id: '1',
    fixed: true
  },
  {
    name: "Хромовый шар 30см.",
    price: "40",
    id: '2',
    fixed: true
  },
  {
    name: "Шар с конфетти 30см.",
    price: "40",
    id: '3',
    fixed: true
  },
  {
    name: "Фольгированные сердце, звезда, круг 45см.",
    price: "85",
    id: '4',
    fixed: true
  },
  {
    name: "Цифра 66см.",
    price: "200",
    id: '5',
    fixed: true
  },
  {
    name: "Цифра 100см.",
    price: "250",
    id: '6',
    fixed: true
  },
  {
    name: "Фольгированные фигуры 45см+.",
    price: "200+",
    id: '7',
    fixed: false
  },
  {
    name: "Коробка без надписи и банта",
    price: "400",
    id: '8',
    fixed: true
  },
  {
    name: "Коробка с надписью и бантом",
    price: "500",
    id: '9',
    fixed: true
  },
];

let arr = new Array(db.length);

for (let i = 0; i < db.length; i++) {
  arr[i] = {
    leftText: db[i].name,
    rightText: db[i].price,
    id: db[i].id,
    fixed: db[i].fixed
  };
}

const Calculator: NextPage = () => {
  return (
    <NavBar title='Калькулятор'>
      <ContentLayout>
        <ListWithCounter measure={"грн."} data={arr} />
      </ContentLayout>
    </NavBar>
  );
};

export default Calculator;
