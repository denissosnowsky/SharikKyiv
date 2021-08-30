import type { NextPage } from "next";
import ContentLayout from "../../components/Layouts/ContentLayout/ContentLayout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../../components/Layouts/Navbar/Navbar";
import CardComponent from "../../components/Card/CardComponent";
import DropdownBtn from "../../components/DropdownBtn/DropdownBtn";
import DropdownBtnWithColor from "../../components/DropdownBtnWithColor/DropdownBtnWithColor";
import { useEffect, useState } from "react";
import RangeInput from "../../components/RangeInput/RangeInput";
import {
  useAllBalloonsQuery,
  useBalloonsQuery,
  useCategoriesQuery,
  useColorsQuery,
} from "../../store/generated/graphql";
import { NetworkStatus } from "@apollo/client";
import PaginationFC from "../../components/Pagination/Pagination";

const AtomCatalog: NextPage = () => {
  const TAKE = 6;
  const [page, setPage] = useState<number>(1);

  const {
    loading: loadingBalloons,
    error: errorBalloons,
    data: dataBalloons,
    fetchMore,
    networkStatus,
  } = useBalloonsQuery({
    variables: {
      skip: (page - 1) * TAKE,
      take: TAKE,
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    loading: loadingCount,
    error: errorCount,
    data: dataCount,
  } = useAllBalloonsQuery();

  const {
    loading: loadingCategory,
    error: errorCategory,
    data: dataCategory,
  } = useCategoriesQuery();

  const {
    loading: loadingColor,
    error: errorColor,
    data: dataColor,
  } = useColorsQuery();

  useEffect(() => {
    fetchMore({
      variables: {
        skip: page * TAKE,
        take: TAKE,
      },
    });
  }, [page]);

  if (networkStatus === NetworkStatus.refetch) return <h1>Refetching...</h1>;
  if (loadingBalloons || loadingCount || loadingCategory || loadingColor)
    return <h1>Loading...</h1>;
  if (errorBalloons || errorCount || errorCategory || errorColor) {
    console.log(
      errorBalloons
        ? errorBalloons
        : errorCount
        ? errorCount
        : errorCategory
        ? errorCategory
        : errorColor
    );
  }

  return (
    <NavBar title="Отдельные шары">
      <ContentLayout>
        <Row style={{ height: "60px" }}>
          <Col
            className="d-flex justify-content-center align-items-center"
            xs={4}
          >
            <DropdownBtn
              title="Выбрать категорию"
              items={dataCategory?.categories!}
            />
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            xs={4}
          >
            <RangeInput
              title="Макс. цена"
              min={0}
              max={3000}
              step={50}
              start={3000}
            />
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            xs={4}
          >
            <DropdownBtnWithColor
              title="Выбрать цвет"
              items={dataColor?.colors!}
            />
          </Col>
        </Row>
        <Row>
          {dataBalloons?.balloons &&
            dataBalloons?.balloons?.length > 0 &&
            dataBalloons?.balloons?.map((item) => (
              <CardComponent
                key={item?.id}
                name={item?.name!}
                subName={item?.subname!}
                price={item?.price!}
                code={item?.code!}
                id={item?.id!}
                photo={item?.image!}
                measure={"грн."}
              />
            ))}
        </Row>
        <PaginationFC
          page={page}
          setPage={setPage}
          pageSize={TAKE}
          allCount={dataCount?.allBalloons!}
        />
      </ContentLayout>
    </NavBar>
  );
};

export default AtomCatalog;
