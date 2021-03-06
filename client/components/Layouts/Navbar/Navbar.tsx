import cs from "classnames";
import s from "./Navbar.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Head from "next/head";
import PhoneBlock from "../../PhoneBlock/PhoneBlock";
import SocialNetBlock from "../../SocialNetBlock/SocialNetBlock";
import {
  usePhonesQuery,
  useSocialNetsQuery,
} from "../../../store/generated/graphql";
import { memo, ReactNode, SFC, useState } from "react";
import { showError } from "../../../utils/showError";
import NavC from "../../NavC/NavC";


const NavBar = ({ children, title }: {children?: React.ReactNode, title: string}): JSX.Element => {
  const [pushMobileMenu, setPushMobileMenu] = useState(false);

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
    showError("Ошибка. Перезагрузите пожалуйста страницу");
  }

  return (
    <>
      <Head>
        <title>{title} | SharikKyiv</title>
      </Head>
      <div>
      <div className={cs([s.black, pushMobileMenu && s.showBlack])}></div>
      <Row className={cs([s.headerRow])}>
        <Col xs={3} md={4} className={s.mobileMenuCol}>
          <div className={cs([s.mobileMenu])} onClick={()=>setPushMobileMenu(!pushMobileMenu)}>
            {pushMobileMenu ?
              <img src='/cross.png'></img>
              :
              <img src='/burger.png'></img>
            }
            
          </div>
        </Col>
        <Col style={{ position: "relative" }} xs={{ span: 4 }} md={4}>
          <Image src="/logo.svg" alt="Logo" layout="fill" className={s.logo} />
        </Col>
        <Col
          xs={5}
          md={4}
          className="d-flex flex-column align-items-end justify-content-center"
        >
          <div className={s.phoneBlock}>
            {dataPhone?.phones?.map(
              (item, i) =>
                i === 0 && (
                  <PhoneBlock
                    fontSize="20px"
                    number={item!.number}
                    key={item?.id}
                  />
                )
            )}
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
        <Col xs={0} sm={0} md={3} className={cs([s.col])}>
          <nav className={s.navbar}>
            <NavC/>
          </nav>
        </Col>
        <Col xs={12} sm={12} md={9} className={s.col}>
          <div className={s.mainWrapper}>
          <div className={cs([s.rollMenu, pushMobileMenu && s.rollMenuShow])}>
          <NavC clb={setPushMobileMenu}/>
        </div>
            <main className={s.main}>{children}</main>
          </div>
        </Col>
      </Row>
      </div>
    </>
  );
};

export default NavBar;
