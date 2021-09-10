import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./AddColorModal.module.css";
import { useState } from "react";
import { AddColorMutationVariables } from "../../store/generated/graphql";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface AddColorPropsType {
  isShow: boolean;
  setShow: (value: boolean) => void;
  addMutation: (args: AddColorMutationVariables) => void;
}

const AddColorModal: React.FC<AddColorPropsType> = ({
  isShow,
  setShow,
  addMutation,
}) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [cssName, setCssName] = useState<string | undefined>(undefined);

  const handleCancel = () => {
    setShow(false);
  };

  const handleAdd = () => {
    if (!name) return showError("Введите Название цвета");
    if (!cssName) return showError("Введите Код цвета");

    const args: AddColorMutationVariables = {
      name: name!,
      cssName: cssName!
    };
    console.log(args);
    addMutation(args);
    setShow(false);
    showSuccess('Цвет добавлен');
  };

  return (
    <Modal
      size="lg"
      show={isShow}
      onHide={() => {}}
      aria-labelledby="example-modal-sizes-title-lg"
      className={s.wrapper}
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          Добавить цвет
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
              Название цвета:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Название цвета"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
              Название кода цвета:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Название кода цвета"
                value={cssName}
                onChange={(e) => setCssName(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              variant="danger"
              className="my-2 w-75"
              onClick={handleCancel}
            >
              Отменить
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button variant="success" className="my-2 w-75" onClick={handleAdd}>
              Сохранить
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AddColorModal;
