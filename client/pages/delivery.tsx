import ListGroup from "react-bootstrap/ListGroup";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import Loading from "../components/Loading/Loading";
import { useDeliveryPriceQuery } from "../store/generated/graphql";
import s from "../styles/Delivery.module.css";
import { showError } from "../utils/showError";

const Delivery: () => JSX.Element | void = () => {
  const { loading, error, data } = useDeliveryPriceQuery();

  if (error) {
    console.log(error);
    return showError("Ошибка. Перезагрузите пожалуйста страницу");
  }

  return (
    <NavBar title="Доставка и Оплата">
      <ContentLayout>
        {loading ? (
          <Loading />
        ) : (
          <>
            <ListGroup variant="flush" className={s.ul}>
              <ListGroup.Item className={s.header}>Доставка</ListGroup.Item>
              <ListGroup.Item className={s.body}>
                Круглостуточно по Киеву и области{" "}
                <span className={s.price}>{data?.deliveryPrice?.price}</span>{" "}
                грн.
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush" className={s.ul}>
              <ListGroup.Item className={s.header}>Оплата</ListGroup.Item>
              <ListGroup.Item className={s.body}>
                Оплата наличными или переводом на карту
              </ListGroup.Item>
            </ListGroup>
          </>
        )}
      </ContentLayout>
    </NavBar>
  );
};

export default Delivery;
