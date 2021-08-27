import type { NextPage } from "next";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import PhoneBlock from "../components/PhoneBlock/PhoneBlock";
import SocialNetBlock from "../components/SocialNetBlock/SocialNetBlock";

const Contacts: NextPage = () => {
  return (
    <NavBar title="Контакты">
      <ContentLayout>
        <Row>
          <Col
            className="d-flex justify-content-center flex-column align-items-center"
            style={{ paddingTop: "70px", paddingBottom: "20px" }}
          >
            {[1].map((i) => (
              <PhoneBlock fontSize="30px" number="+380932209533" key={i} />
            ))}
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <SocialNetBlock
              size="70px"
              margin="10px"
              title="Telegram"
              href="https://telegram.me/den_sosnowsky"
              image="/telegram.png"
            />
            <SocialNetBlock
              size="70px"
              margin="10px"
              title="Instagram"
              href="https://www.instagram.com/sharikkyiv"
              image="/instagram.png"
            />
          </Col>
        </Row>
      </ContentLayout>
    </NavBar>
  );
};

export default Contacts;
