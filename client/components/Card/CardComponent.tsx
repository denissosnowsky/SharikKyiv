import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import s from "./CardComponent.module.css";
import Router from "next/router";
import cs from "classnames";
import Counter from "../Counter/Counter";

interface CardComponentProps {
  photo: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ photo }) => {
  const handleDetails = () => {
    Router.push("/bouqcatalog/1");
  };

  return (
    <Col className={s.card} xs={4}>
      <Card
        style={{ width: "18rem", borderRadius: "15px" }}
        className="border border-1"
      >
        <Card.Img
          variant="top"
          src={photo}
          className={s.img}
          onClick={handleDetails}
        />
        <Card.Body className="d-flex flex-column align-items-center pb-2">
          <Card.Title className={s.title}>Розовий</Card.Title>
          <Card.Title className={s.subTitle}>хром</Card.Title>
          <Card.Title className={s.price}>1000 грн.</Card.Title>
          <Counter minValue={1} />
          <Button
            variant="outline-danger"
            className={cs([s.button], "w-50", "btn-sm", "m-1")}
          >
            В Корзину
          </Button>
          <Button
            variant="outline-primary"
            className={cs([s.button], "w-50", "btn-sm", "m-1")}
            onClick={handleDetails}
          >
            Подробнее...
          </Button>
          <Card.Text className={s.code}>Артикул: 10123</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardComponent;
