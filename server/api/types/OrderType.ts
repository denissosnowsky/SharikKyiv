interface Order {
    name: string,
    price: number,
    quantity: number,
    code: number,
    description: string,
    image: string
}


export interface OrderType {
    name: string,
    phone: string,
    address: string,
    date: string,
    time: string,
    totalPrice: number,
    userId: string,
    orders: Array<Order>
};