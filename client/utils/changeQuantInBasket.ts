import { basketVar } from "../store/variables";

export const changeQuantInBasket = (code: number, quant: number) => {
  const orders = basketVar();
  const filteredOrders = orders.map((obj) =>
    obj.code === code ? { ...obj, quantity: quant } : obj
  );
  basketVar([...filteredOrders]);
};
