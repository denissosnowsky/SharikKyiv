import { basketVar } from "../store/variables";

export const deleteFromBasket = (code: number) => {
    const orders = basketVar();
    const filteredOrders = orders.filter(obj => obj.code != code);
    basketVar(filteredOrders);
}