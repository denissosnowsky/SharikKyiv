import type { NextPage } from "next";
import ContentLayout from "../../components/Layouts/ContentLayout/ContentLayout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../../components/Layouts/Navbar/Navbar";
import CardComponent from "../../components/Card/CardComponent";
import RangeInput from "../../components/RangeInput/RangeInput";
import {
  useAllBouquetsQuery,
  useBouquetsQuery,
} from "../../store/generated/graphql";
import { useEffect, useState } from "react";
import { NetworkStatus } from "@apollo/client";
import PaginationFC from "../../components/Pagination/Pagination";

const BouqCatalog: NextPage = () => {
  const TAKE = 6;
  const [page, setPage] = useState<number>(1);

  const {
    loading: loadingBouquets,
    error: errorBouquets,
    data: dataBouquets,
    fetchMore,
    networkStatus,
  } = useBouquetsQuery({
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
  } = useAllBouquetsQuery();

  useEffect(() => {
    fetchMore({
      variables: {
        skip: page * TAKE,
        take: TAKE,
      },
    });
  }, [page]);

  if (networkStatus === NetworkStatus.refetch) return <h1>Refetching...</h1>;
  if (loadingBouquets || loadingCount) return <h1>Loading...</h1>;
  if (errorBouquets || errorCount) {
    console.log(errorBouquets ? errorBouquets : errorCount);
  }

  return (
    <NavBar title="Готовые букеты">
      <ContentLayout>
        <Row style={{ height: "60px" }}>
          <Col
            className="d-flex justify-content-center align-items-center"
            xs={4}
          ></Col>
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
          ></Col>
        </Row>
        <Row>
          {dataBouquets?.bouquets &&
            dataBouquets?.bouquets?.length > 0 &&
            dataBouquets?.bouquets?.map((item) => (
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
          allCount={dataCount?.allBouquets!}
        />
      </ContentLayout>
    </NavBar>
  );
};

export default BouqCatalog;
