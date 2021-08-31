import s from "./Product.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Counter from "../../components/Counter/Counter";
import Button from "react-bootstrap/Button";
import cs from "classnames";
import { googleUrl } from "../../config";

interface ProductProps {
  title: string
  subTitle: string
  desc: string
  code: number
  img: string
  price: number
  measure: string
}

const Product: React.FC<ProductProps> = ( {title, subTitle, desc, code, img, price, measure} ) => {
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
        <div className={s.price}>{price} {measure}</div>
        <div className={s.desc}>
          <span>Состав</span>: {desc}
        </div>
        <div>
          <Counter minValue={1} />
        </div>
        <div className={s.btnWrapper}>
          <Button variant="danger" className={s.btn}>
            В Корзину
          </Button>
        </div>
        <div className={s.code}>Артикул: {code}</div>
      </Col>
    </Row>
  );
};

export default Product;
