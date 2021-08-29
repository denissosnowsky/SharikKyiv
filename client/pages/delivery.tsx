import ListGroup from "react-bootstrap/ListGroup";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import { useDeliveryPriceQuery } from "../store/generated/graphql";
import s from "../styles/Delivery.module.css";

const Delivery: (() => JSX.Element | undefined) = () => {

  const { loading, error, data } = useDeliveryPriceQuery();

  if (loading) return <h1>Loading...</h1>
  if(error) {
    console.log(error);
    return;
  } 

  return (
    <NavBar title='Доставка и Оплата'>
      <ContentLayout>
        <ListGroup variant="flush" className={s.ul}>
          <ListGroup.Item className={s.header}>Доставка</ListGroup.Item>
          <ListGroup.Item className={s.body}>
            Круглостуточно по Киеву и области{" "}
            <span className={s.price}>{data?.deliveryPrice?.price}</span> грн.
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
