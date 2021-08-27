import { OrderType } from "../api/types/OrderType";
import fetch from "node-fetch";
import config from "config";

export const sendTelegramMessage = async (o: OrderType) => {
  let userInfo = `
Имя: ${o.name}
Телефон: ${o.phone}
Адрес: ${o.address}
День: ${o.date}
Час: ${o.time}
Заказов: ${o.orders.length}
Вся сумма: ${o.totalPrice}
Заказчик: ${o.userId}
`;

  for (let i = 0; i < o.orders.length; i++) {
    const itemInfo = `
Заказ ${i+1} ------------------
Название: ${o.orders[i].name}
Цена: ${o.orders[i].price}
Количество: ${o.orders[i].quantity}
Описание: ${o.orders[i].description}
Артикул: ${o.orders[i].code}
Фото: ${o.orders[i].image}
Заказчик: ${o.userId}
`;
    userInfo += itemInfo;
  }

  return await fetch(
    encodeURI(
      `https://api.telegram.org/bot${config.get(
        "telegramBotToken"
      )}/sendMessage?chat_id=${config.get("telegramChatId")}&text=${userInfo}`
    )
  )
    .then(() => true)
    .catch(() => false);
};
