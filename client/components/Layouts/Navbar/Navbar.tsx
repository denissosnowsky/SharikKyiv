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

interface NavBarProps {
  title: string;
}

const NavBar: React.FC<NavBarProps> = ({ children, title }) => {
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
          <div className='me-5'>
            <PhoneBlock fontSize="20px" number="+380932209533" />
            <div className="d-flex justify-content-center">
              <SocialNetBlock
                size="35px"
                margin="5px"
                title="Telegram"
                href="https://telegram.me/den_sosnowsky"
                image="/telegram.png"
              />
              <SocialNetBlock
                size="35px"
                margin="5px"
                title="Instagram"
                href="https://www.instagram.com/sharikkyiv"
                image="/instagram.png"
              />
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
                  <Badge bg="danger">0</Badge>
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
