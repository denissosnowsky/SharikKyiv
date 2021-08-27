import type { NextPage } from "next";
import ContentLayout from "../../components/Layouts/ContentLayout/ContentLayout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../../components/Layouts/Navbar/Navbar";
import CardComponent from "../../components/Card/CardComponent";
import RangeInput from "../../components/RangeInput/RangeInput";

const BouqCatalog: NextPage = () => {
  return (
    <NavBar title="Готовые букеты">
      <ContentLayout>
        <Row style={{ height: "60px" }}>
          <Col className="d-flex justify-content-center align-items-center" xs={4}></Col>
          <Col className="d-flex justify-content-center align-items-center" xs={4}>
            <RangeInput
              title="Макс. цена"
              min={0}
              max={3000}
              step={50}
              start={3000}
            />
          </Col>
          <Col className="d-flex justify-content-center align-items-center" xs={4}></Col>
        </Row>
        <Row>
          <CardComponent photo="/photo.jpg" />
          <CardComponent photo="/photo.jpg" />
          <CardComponent photo="/photo.jpg" />
          <CardComponent photo="/photo.jpg" />
          <CardComponent photo="/photo.jpg" />
          <CardComponent photo="/photo.jpg" />
          <CardComponent photo="/photo.jpg" />
        </Row>
      </ContentLayout>
    </NavBar>
  );
};

export default BouqCatalog;
