import type { NextPage } from "next";
import ListGroup from "react-bootstrap/ListGroup";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import s from "../styles/Delivery.module.css";

const Delivery: NextPage = () => {
  return (
    <NavBar title='Доставка и Оплата'>
      <ContentLayout>
        <ListGroup variant="flush" className={s.ul}>
          <ListGroup.Item className={s.header}>Доставка</ListGroup.Item>
          <ListGroup.Item className={s.body}>
            Круглостуточно по Киеву и области{" "}
            <span className={s.price}>100</span> грн.
          </ListGroup.Item>
        </ListGroup>
        <ListGroup variant="flush" className={s.ul}>
          <ListGroup.Item className={s.header}>Оплата</ListGroup.Item>
          <ListGroup.Item className={s.body}>
            Оплата наличными или переводом на карту
          </ListGroup.Item>
        </ListGroup>
      </ContentLayout>
    </NavBar>
  );
};

export default Delivery;
