import type { NextPage } from "next";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import List from "../components/List/List";

const Price: NextPage = () => {
  const db = [
    {
      name: "Латексный шар 30см.",
      price: "35",
      id: 1,
    },
    {
      name: "Хромовый шар 30см.",
      price: "40",
      id: 2,
    },
    {
      name: "Шар с конфетти 30см.",
      price: "40",
      id: 3,
    },
    {
      name: "Фольгированные сердце, звезда, круг 45см.",
      price: "85",
      id: 4,
    },
    {
      name: "Цифра 66см.",
      price: "200",
      id: 5,
    },
    {
      name: "Цифра 100см.",
      price: "250",
      id: 6,
    },
    {
      name: "Фольгированные фигуры 45см+.",
      price: "200+",
      id: 7,
    },
    {
      name: "Коробка без надписи и банта",
      price: "400",
      id: 8,
    },
    {
      name: "Коробка с надписью и бантом",
      price: "500",
      id: 9,
    },
  ];

  let arr = new Array(db.length);

  for (let i = 0; i < db.length; i++) {
    arr[i] = {
      leftText: db[i].name,
      rightText: `${db[i].price} грн.`,
      id: db[i].id,
    };
  }

  return (
    <NavBar title='Цены'>
      <ContentLayout>
        <List data={arr} />
      </ContentLayout>
    </NavBar>
  );
};

export default Price;
