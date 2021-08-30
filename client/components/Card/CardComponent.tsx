import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import s from "./CardComponent.module.css";
import Router from "next/router";
import cs from "classnames";
import Counter from "../Counter/Counter";
import Link from "next/link";

interface CardComponentProps {
  photo: string;
  name: string;
  subName: string;
  price: string;
  code: number;
  id: string;
  measure: string;
}

const CardComponent: React.FC<CardComponentProps> = ({
  photo,
  name,
  subName,
  price,
  code,
  id,
  measure,
}) => {
  return (
    <Col className={s.card} xs={4}>
      <Card
        style={{ width: "18rem", borderRadius: "15px" }}
        className="border border-1"
      >
        <Card.Img variant="top" src={photo} className={s.img} />
        <Card.Body className="d-flex flex-column align-items-center pb-2">
          <Card.Title className={s.title}>{name}</Card.Title>
          <Card.Title className={s.subTitle}>{subName}</Card.Title>
          <Card.Title className={s.price}>
            {price} {measure}
          </Card.Title>
          <Counter minValue={1} />
          <Link href={`/basket`}>
            <a className={s.link}>
              <Button
                variant="outline-danger"
                className={cs([s.button], "w-50", "btn-sm", "m-1")}
              >
                В Корзину
              </Button>
            </a>
          </Link>
          <Link href={`/bouqcatalog/${id}`}>
            <a className={s.link}>
              <Button
                variant="outline-primary"
                className={cs([s.button], "w-50", "btn-sm", "m-1")}
              >
                Подробнее...
              </Button>
            </a>
          </Link>
          <Card.Text className={s.code}>Артикул: {code}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardComponent;
