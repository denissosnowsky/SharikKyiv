export interface BasketStatusType {
  basketQuantity: number;
  isInBasket: boolean;
}

export type BasketObjType = {
  leftText: string;
  rightText: string;
  id: number;
  image: string;
  description: string;
  quantity: number;
};

export type FormType = {
  name: string;
  phone: string;
  address: string;
  date: string;
  time: string;
}