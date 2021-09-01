import s from "./Product.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Counter from "../../components/Counter/Counter";
import Button from "react-bootstrap/Button";
import cs from "classnames";
import { googleUrl } from "../../config";
import { BasketStatusType } from "../../types/BasketTypes";
import { deleteFromBasket } from "../../utils/deleteFromBasket";
import { addToBasket } from "../../utils/addToBasket";
import { useState } from "react";

interface ProductProps {
  title: string;
  subTitle: string;
  desc: string;
  code: number;
  img: string;
  price: number;
  measure: string;
  basketStatus: BasketStatusType;
}

const Product: React.FC<ProductProps> = ({
  title,
  subTitle,
  desc,
  code,
  img,
  price,
  measure,
  basketStatus,
}) => {
  const [count, setCount] = useState<number>(1);

  const handleDeleteItem = (id: number) => {
    deleteFromBasket && deleteFromBasket(id);
  };

  const handleAddToBasket = () => {
    addToBasket({
      name: `${title} ${subTitle}`,
      price,
      quantity: count,
      code,
      description: desc,
      image: `${googleUrl}${img}`,
    });
  };

  const fetchCurrentCount = (count: number) => {
    setCount(count);
  };

  return (
    <Row>
      <Col className={cs([s.imageCol], "d-flex", "justify-content-center")}>
        <div style={{ height: "100%", width: "370px" }}>
          <img src={`${googleUrl}${img}`} className={s.image} />
        </div>
      </Col>
      <Col className="d-flex flex-column">
        <div className={s.title}>{title}</div>
        <div className={s.subTitle}>{subTitle}</div>
        <div className={s.price}>
          {price} {measure}
        </div>
        <div className={s.desc}>
          <span>Состав</span>: {desc}
        </div>
        <div>
          <Counter
            minValue={1}
            start={
              basketStatus.isInBasket ? basketStatus.basketQuantity : undefined
            }
            clb={fetchCurrentCount}
          />
        </div>
        <div className={s.btnWrapper}>
          {basketStatus.isInBasket ? (
            <Button
              variant="success"
              className={cs([s.button], "m-1")}
              onClick={() => handleDeleteItem(code)}
            >
              Удалить
            </Button>
          ) : (
            <Button
              variant="danger"
              className={cs([s.button], "m-1")}
              onClick={handleAddToBasket}
            >
              В Корзину
            </Button>
          )}
        </div>
        <div className={s.code}>Артикул: {code}</div>
      </Col>
    </Row>
  );
};

export default Product;
