import type { NextPage } from "next";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import ListWithCounterAndPhoto from "../components/ListWithCounterAndPhoto/ListWithCounterAndPhoto";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import cs from "classnames";
import s from "../styles/Basket.module.css";
import { ChangeEvent, useMemo, useState } from "react";
import { basketVar } from "../store/variables";
import { basketArrConvertor } from "../utils/basketArrConvertor";
import { v4 as uuidv4 } from "uuid";
import { useGetBasketValues } from "../hooks/useGetBasketValues";
import { BasketObjType, FormType } from "../types/BasketTypes";


const Basket: NextPage = () => {

  const basket = useGetBasketValues();
  const convertedBasket: Array<BasketObjType> = basketArrConvertor(basket);

  const initFormState = {
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
  };

  const [state, setState] =
    useState<FormType>(initFormState);

  const [error, setError] = useState<string>('');

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const completeOrder = useMemo(()=>({
    name: state.name,
    phone: state.phone,
    address: state.address,
    date: state.date,
    time: state.time,
    totalPrice: basket.reduce((sum, obj)=>sum + (obj.price*obj.quantity), 0),
    userId: uuidv4(),
    orders: basket
  }), [state, basket])

  const handleOrder = () => {
    if(!state.name) return setError('Введите имя')
    if(!state.phone) return setError('Введите телефон')
    if(!state.address) return setError('Введите адрес')
    if(!state.date) return setError('Введите дату')
    if(!state.time) return setError('Введите время')
    console.log(completeOrder)
  };

  if(error){
    setTimeout(()=>setError(''), 3000);
  }

  return (
    <NavBar title="Корзина">
      <ContentLayout>
        {convertedBasket.length > 0 ? (
          <>
            <ListWithCounterAndPhoto measure={"грн."} data={convertedBasket} />
            <Form
              className={cs(
                [s.form],
                "d-flex",
                "align-items-center",
                "flex-column"
              )}
            >
              <div className={s.header}>Заполните данные:</div>
              <FloatingLabel
                controlId="name"
                label="Ваше имя"
                className="mb-3"
                style={{ width: "100%" }}
              >
                <Form.Control
                  type="text"
                  placeholder="Ваше имя"
                  name="name"
                  value={state.name}
                  onChange={handleInputs}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="phone"
                label="Ваш телефон"
                className="mb-3"
                style={{ width: "100%" }}
              >
                <Form.Control
                  type="text"
                  placeholder="Ваш телефон"
                  name="phone"
                  value={state.phone}
                  onChange={handleInputs}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="address"
                label="Адрес доставки"
                className="mb-3"
                style={{ width: "100%" }}
              >
                <Form.Control
                  type="text"
                  placeholder="Адрес доставки"
                  name="address"
                  value={state.address}
                  onChange={handleInputs}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="day"
                label="Желаемый день доставки"
                className="mb-3"
                style={{ width: "100%" }}
              >
                <Form.Control
                  type="date"
                  placeholder="Желаемый день доставки"
                  name="date"
                  value={state.date}
                  onChange={handleInputs}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="time"
                label="Желаемый час доставки"
                style={{ width: "100%" }}
              >
                <Form.Control
                  type="time"
                  placeholder="Желаемый час доставки"
                  name="time"
                  value={state.time}
                  onChange={handleInputs}
                />
              </FloatingLabel>
              <div className={s.attention}>
                *Указаное время может быть занято, менеджер уточнит во время
                звонка
              </div>
              <Button
                variant="primary"
                className={s.submitBtn}
                onClick={handleOrder}
              >
                Подтвердить заказ
              </Button>
            </Form>
          </>
        ) : (
          <div className={s.emptyBaskettext}>Корзина пустая</div>
        )}
      </ContentLayout>
    </NavBar>
  );
};

export default Basket;
