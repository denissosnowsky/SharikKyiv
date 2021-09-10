import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import {
  ChangeAssortmantMutationVariables,
  DeleteAssortmantMutationVariables,
} from "../../store/generated/graphql";
import { showSuccess } from "../../utils/showSucces";
import s from "./AssortmentList.module.css";

interface AssortmentListPropsType {
  data: {
    id: string;
    name: string;
    price: string;
    fixed: boolean;
  };
  deleteMutation: (args: DeleteAssortmantMutationVariables) => void;
  changeMutation: (args: ChangeAssortmantMutationVariables) => void;
}

const AssortmentList: React.FC<AssortmentListPropsType> = ({
  data,
  deleteMutation,
  changeMutation,
}) => {
  const [change, setChange] = useState(false);
  const [name, setName] = useState(data.name);
  const [price, setPrice] = useState(data.price);
  const [fixed, setFixed] = useState<string | undefined>(data.fixed ? 'true' : 'false');

  const handleChange = () => {
    const args: ChangeAssortmantMutationVariables = {
      id: data.id,
      name: name!,
      price: price!,
      fixed: fixed==='true' ? true : false
    }
    changeMutation(args);
    setChange(false);
    showSuccess('Категория изменена');
  };

  return (
    <>
      {!change ? (
        <ListGroup.Item className={s.li}>
          <div>
            <div className={s.listWrapper}>
              <span>{data.name}</span>
              <div>
                <Button
                  variant="primary"
                  onClick={() => {
                    setChange(true);
                  }}
                  className="me-2"
                >
                  Изменить
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteMutation({ id: data.id })}
                >
                  Удалить
                </Button>
              </div>
            </div>
            <div>
              <span>
                Цена: {data.price} {"грн."}
              </span>
            </div>
            <div>
              <span>Фиксирована: {data.fixed ? "да" : "нет"}</span>
            </div>
          </div>
        </ListGroup.Item>
      ) : (
        <ListGroup.Item className={s.li2}>
          <div>
            <div className={s.listWrapper2}>
              <span>
                Название:{" "}
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </span>
              <div>
                <Button
                  variant="primary"
                  onClick={handleChange}
                  className="me-2"
                >
                  Сохранить
                </Button>
                <Button variant="danger" onClick={() => setChange(false)}>
                  Отменить
                </Button>
              </div>
            </div>
            <div className='mb-2'>
              <span>
                Цена:{" "}
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />{" "}
                {"грн."}
              </span>
            </div>
            <div>
              <span>
                Фиксирована:{" "}
                <select value={fixed} onChange={(e) => setFixed(e.target.value)}>
                  <option>Выбрать фиксированость...</option>
                  <option value={"true"}>Фиксирована</option>
                  <option value={"false"}>Не фиксирована</option>
                </select>
              </span>
            </div>
          </div>
        </ListGroup.Item>
      )}
    </>
  );
};

export default AssortmentList;
