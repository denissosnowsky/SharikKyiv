import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import s from "./ListWithCounterAndPhoto.module.css";
import Counter from "../Counter/Counter";
import { useState, useMemo } from "react";
import cs from "classnames";
import { useCounterInitState } from "../../hooks/useCounterInitState";
import { sumOfObjectValues } from "../../utils/sumOfObjectValues";
import { counterStateChanger } from "../../utils/counterStateChanger";

type FetchedDataObj = {
  leftText: string;
  rightText: string;
  id: string;
  image: string;
  description: string;
};

interface ListWithCounterAndPhotoProps {
  data: Array<FetchedDataObj>;
  measure: string;
}

const ListWithCounterAndPhoto: React.FC<ListWithCounterAndPhotoProps> = ({
  data,
  measure,
}) => {
  // make an object for initial valeu for useState. Made from id of the fetched data
  const initialState = useCounterInitState<FetchedDataObj>(data);

  const [counters, setCounters] =
    useState<Record<string, number>>(initialState);
  const [sum, setSum] = useState<number>(0);

  useMemo(() => setSum(sumOfObjectValues(counters)), [counters]);

  const handleCounterPrice = (property: string, initValue: number) => {
    return (value: number) => {
      setCounters(counterStateChanger(counters, property, value, initValue));
    };
  };

  const handleDeleteItem = (id: string) => {
    alert(id);
  };

  return (
    <ListGroup variant="flush" className={s.group}>
      {data.map((i) => (
        <ListGroup.Item className={s.li} key={i.id}>
          <Row className={s.upRow}>
            <Col xs={2}>
              <div className={s.imageWrapper}>
                <img src={i.image} className={s.image} />
              </div>
            </Col>
            <Col xs={4} className={s.title}>
              {i.leftText}
            </Col>
            <Col xs={3}>
              <Counter
                clb={handleCounterPrice(i.id, Number(i.rightText))}
                minValue={1}
              />
            </Col>
            <Col xs={2} className={s.lastCol}>
              {counters[i.id]} {measure}
            </Col>
            <Col xs={1}>
              <i
                className={cs([s.bin], "bi", "bi-trash-fill")}
                onClick={() => handleDeleteItem(i.id)}
              ></i>
            </Col>
          </Row>
          <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
            <Col>Состав: {i.description}</Col>
          </Row>
        </ListGroup.Item>
      ))}
      <ListGroup.Item className={s.li}>
        <Row className={s.sumRow}>
          <Col xs={6}>ВСЕГО: </Col>
          <Col xs={6} className={s.lastCol}>
            {sum} {measure}
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ListWithCounterAndPhoto;
