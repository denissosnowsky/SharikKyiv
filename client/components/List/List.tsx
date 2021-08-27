import ListGroup from "react-bootstrap/ListGroup";
import s from "./List.module.css";

interface ListProps {
  data: Array<{
    leftText: string;
    rightText: string;
    id: number;
  }>;
}

const List: React.FC<ListProps> = ({ data }) => {
  return (
    <ListGroup variant="flush" className={s.ul}>
      {data.map((i) => (
        <ListGroup.Item className={s.li} key={i.id}>
          <span>{i.leftText}</span>
          <span>{i.rightText}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default List;
