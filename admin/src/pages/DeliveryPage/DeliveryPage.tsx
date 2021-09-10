import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import {
  useChangeDeliveryPriceMutation,
  useDeliveryPriceQuery,
} from "../../store/generated/graphql";
import s from "./DeliveryPage.module.css";
import Button from 'react-bootstrap/Button';
import ChangeDeliveryModal from "../../components/ChangeDeliveryModal/ChangeDeliveryModal";
import { showError } from "../../utils/showError";

interface DeliveryPagePropsType {}

const DeliveryPage: React.FC<DeliveryPagePropsType> = () => {
  const [isShowed, setIsShowed] = useState<boolean>(false);

  const {
    loading: loadingPrice,
    error: errorPrice,
    data: dataPrice,
  } = useDeliveryPriceQuery();

  const [
    changePrice,
    {
      data: dataChangePrice,
      loading: loadingChangePrice,
      error: errorChangePrice,
    },
  ] = useChangeDeliveryPriceMutation({
    refetchQueries: ["DeliveryPrice"],
  });

  if (errorPrice || errorChangePrice) {
    console.log(errorPrice ? errorPrice : errorChangePrice);
    showError('Непонятная ошибка. Перезагрузите страницу!');
    return;
  }

  if (loadingPrice || loadingChangePrice) return <Loading />;

  return (
    <>
    {isShowed && (
        <ChangeDeliveryModal
          isShow={isShowed}
          setShow={setIsShowed}
          id={dataPrice.deliveryPrice.id!}
          addMutation={(args) =>
            changePrice({
              variables: args,
            })
          }
        />
      )}
      <div className={s.wrapper}>
        <div className={s.text}>Текущая цена доставки:</div>
        <div className={s.price}>{dataPrice.deliveryPrice.price} грн.</div>
      </div>
      <div className={s.btn}>
          <Button variant='success' className='w-50' onClick={()=>setIsShowed(true)}>Изменить цену доставки</Button>
      </div>
    </>
  );
};

export default DeliveryPage;
