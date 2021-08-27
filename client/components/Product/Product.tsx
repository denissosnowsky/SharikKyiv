import s from "./Product.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Counter from "../../components/Counter/Counter";
import Button from "react-bootstrap/Button";
import cs from "classnames";

interface ProductProps {}

const Product: React.FC<ProductProps> = () => {
  return (
    <Row>
      <Col className={cs([s.imageCol], "d-flex", "justify-content-center")}>
        <div style={{ height: "100%", width: "370px" }}>
          <img src="/photo.jpg" className={s.image} />
        </div>
      </Col>
      <Col className="d-flex flex-column">
        <div className={s.title}>Букет Краса</div>
        <div className={s.desc}>
          <span>Состав</span>: 6 шаров красного хрома, 1 звезда красная, 1
          сердце синее, 1 фольгированный автомобиль, 1 цифра 100см.
        </div>
        <div>
          <Counter minValue={1} />
        </div>
        <div className={s.btnWrapper}>
          <Button variant="danger" className={s.btn}>
            В Корзину
          </Button>
        </div>
        <div className={s.code}>Артикул: 10123</div>
      </Col>
    </Row>
  );
};

export default Product;
