import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./AddSocNetModal.module.css";
import { useState } from "react";
import { AddSocialNetMutationVariables } from "../../store/generated/graphql";
import { showError } from "../../utils/showError";
import { showSuccess } from "../../utils/showSucces";

interface AddSocNetModalPropsType {
  isShow: boolean;
  setShow: (value: boolean) => void;
  addMutation: (args: AddSocialNetMutationVariables) => void;
}

const AddSocNetModal: React.FC<AddSocNetModalPropsType> = ({
  isShow,
  setShow,
  addMutation,
}) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [link, setLink] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleCancel = () => {
    setShow(false);
  };

  const handleAdd = () => {
    if (!name) return showError("Введите Название соц. сети");
    if (!link) return showError("Введите Ссылку");
    if (!image) return showError("Введите имя картинки");

    const args: AddSocialNetMutationVariables = {
      name: name!,
      image: image!,
      link: link!,
    };
    addMutation(args);
    setShow(false);
    showSuccess('Соц. сеть добавлена');
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
          Добавить соц. сеть
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
              Имя соц. сети:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Имя соц. сети"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
              Ссылка соц. сети:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Ссылка соц. сети"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
            <Form.Label column sm="2">
              Ссылка на картинку (/name.png):
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Ссылка на картинку"
                value={image}
                onChange={(e) => setImage(e.target.value)}
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

export default AddSocNetModal;
