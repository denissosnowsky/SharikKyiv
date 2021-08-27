import type { NextPage } from "next";
import ContentLayout from "../../components/Layouts/ContentLayout/ContentLayout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../../components/Layouts/Navbar/Navbar";
import CardComponent from "../../components/Card/CardComponent";
import DropdownBtn from "../../components/DropdownBtn/DropdownBtn";
import DropdownBtnWithColor from "../../components/DropdownBtnWithColor/DropdownBtnWithColor";
import { ChangeEvent, useState } from "react";
import RangeInput from "../../components/RangeInput/RangeInput";

const categotyArray = [
  "Все",
  "Пастель, металик шары",
  "Хром шары",
  "Конфетти шары",
  "Фольгированные шары 45см.",
  "Фольгированные шары 45см+.",
  "Цифры 100см.",
  "Цифры 66см.",
  "Коробки",
];
const colorArray = [
  { text: "Золотой", color: "goldenrod" },
  { text: "Серебряный", color: "silver" },
  { text: "Красный", color: "red" },
  { text: "Синий", color: "blue" },
  { text: "Желтый", color: "yellow" },
  { text: "Белый", color: "white" },
  { text: "Черный", color: "black" },
  { text: "Серый", color: "gray" },
  { text: "Фиолетовый", color: "purple" },
  { text: "Голубой", color: "skyblue" },
  { text: "Зеленый", color: "green" },
];

const AtomCatalog: NextPage = () => {
  return (
    <NavBar title="Отдельные шары">
      <ContentLayout>
        <Row style={{ height: "60px" }}>
          <Col className="d-flex justify-content-center align-items-center" xs={4}>
            <DropdownBtn title="Выбрать категорию" items={categotyArray} />
          </Col>
          <Col className="d-flex justify-content-center align-items-center" xs={4}>
            <RangeInput
              title="Макс. цена"
              min={0}
              max={3000}
              step={50}
              start={3000}
            />
          </Col>
          <Col className="d-flex justify-content-center align-items-center" xs={4}>
            <DropdownBtnWithColor title="Выбрать цвет" items={colorArray} />
          </Col>
        </Row>
        <Row>
          <CardComponent photo="/photo2.jpg" />
          <CardComponent photo="/photo2.jpg" />
          <CardComponent photo="/photo2.jpg" />
          <CardComponent photo="/photo2.jpg" />
          <CardComponent photo="/photo2.jpg" />
          <CardComponent photo="/photo2.jpg" />
          <CardComponent photo="/photo2.jpg" />
        </Row>
      </ContentLayout>
    </NavBar>
  );
};

export default AtomCatalog;
