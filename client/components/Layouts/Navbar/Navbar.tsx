import Nav from "react-bootstrap/Nav";
import cs from "classnames";
import s from "./Navbar.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Link from "next/link";
import Badge from "react-bootstrap/Badge";
import Head from "next/head";
import PhoneBlock from "../../PhoneBlock/PhoneBlock";
import SocialNetBlock from "../../SocialNetBlock/SocialNetBlock";
import {
  usePhonesQuery,
  useSocialNetsQuery,
} from "../../../store/generated/graphql";
import { useGetBasketValues } from "../../../hooks/useGetBasketValues";

interface NavBarProps {
  title: string;
}

const NavBar: React.FC<NavBarProps> = ({ children, title }) => {

  const basket = useGetBasketValues(); 

  const {
    loading: loadingPhone,
    error: errorPhone,
    data: dataPhone,
  } = usePhonesQuery();
  const {
    loading: loadingSocial,
    error: errorSocial,
    data: dataSocial,
  } = useSocialNetsQuery();

  if (loadingPhone || loadingSocial) return <h1>Loading...</h1>;
  if (errorPhone || errorSocial) {
    console.log(errorPhone);
    console.log(errorSocial);
    return;
  }

  return (
    <>
      <Head>
        <title>{title} | SharikKyiv</title>
      </Head>
      <Row className={cs([s.headerRow])}>
        <Col style={{ position: "relative" }} xs={{ span: 4, offset: 4 }}>
          <Image src="/logo.svg" alt="Logo" layout="fill" className={s.logo} />
        </Col>
        <Col
          xs={4}
          className="d-flex flex-column align-items-end justify-content-center"
        >
          <div className="me-5">
            {dataPhone?.phones?.map((item) => (
              <PhoneBlock
                fontSize="20px"
                number={item!.number}
                key={item?.id}
              />
            ))}
            <div className="d-flex justify-content-center">
              {dataSocial?.socialNets?.map((item) => (
                <SocialNetBlock
                  key={item?.id}
                  size="35px"
                  margin="5px"
                  title={item!.name}
                  href={item!.link}
                  image={item!.image}
                />
              ))}
            </div>
          </div>
        </Col>
      </Row>
      <Row className={s.mainRow}>
        <Col xs={3} className={s.col}>
          <nav className={s.navbar}>
            <Nav className={cs([s.bootNav], "flex-column")}>
              <Link href="/bouqcatalog">
                <a>
                  <i className="bi bi-book"></i>Готовые букеты шаров
                </a>
              </Link>
              <Link href="/atomcatalog">
                <a>
                  <i className="bi bi-layers"></i>Собрать букет самому
                </a>
              </Link>
              <Link href="/price">
                <a>
                  <i className="bi bi-tag"></i>Цены на шарики
                </a>
              </Link>
              <Link href="/calculator">
                <a>
                  <i className="bi bi-calculator"></i>Калькулятор цен
                </a>
              </Link>
              <Link href="/delivery">
                <a>
                  <i className="bi bi-truck"></i>Доставка и оплата
                </a>
              </Link>
              <Link href="/contacts">
                <a>
                  <i className="bi bi-telephone"></i>Контакты
                </a>
              </Link>
              <Link href="/basket">
                <a>
                  <i className="bi bi-cart2"></i>Корзина{" "}
                  <Badge bg="danger">{basket.length}</Badge>
                </a>
              </Link>
            </Nav>
          </nav>
        </Col>
        <Col xs={9} className={s.col}>
          <div className={s.mainWrapper}>
            <main className={s.main}>{children}</main>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default NavBar;
