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
import { useEffect, useState, useCallback } from "react";
import { NetworkStatus } from "@apollo/client";
import PaginationFC from "../../components/Pagination/Pagination";
import { useRouter } from "next/router";

const BouqCatalog: NextPage = () => {
  const TAKE = 12;
  const MAXPRICE = 2000;

  const [page, setPage] = useState(1);
  const [price, setPrice] = useState(MAXPRICE);

  const router = useRouter();

  const {
    loading: loadingBouquets,
    error: errorBouquets,
    data: dataBouquets,
    fetchMore: fetchMoreBouquets,
    networkStatus: networkStatusBouquets,
  } = useBouquetsQuery({
    variables: {
      skip: (page - 1) * TAKE,
      take: TAKE,
      price: price,
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    loading: loadingCount,
    error: errorCount,
    data: dataCount,
    fetchMore: fetchMoreCount,
    networkStatus: networkStatusCount,
  } = useAllBouquetsQuery({
    ssr: false,
    variables: {
      price: price,
    },
  });

  useEffect(() => {
    fetchMoreBouquets({
      variables: {
        skip: (page-1) * TAKE,
        take: TAKE,
        price: price,
      },
    });
  }, [page, price]);

  const handlePrice = useCallback(
    (price: number) => {
      fetchMoreCount({
        variables: {
          price: price,
        },
      });
      setPrice(price);
      setPage(1);
    },
    [price]
  );

  if (
    networkStatusBouquets === NetworkStatus.refetch ||
    networkStatusCount === NetworkStatus.refetch
  )
    return <h1>Refetching...</h1>;
  if (loadingBouquets || loadingCount) return <h1>Loading...</h1>;
  if (errorBouquets || errorCount) {
    console.log(errorBouquets ? errorBouquets : errorCount);
  }

  console.log(dataBouquets);
  console.log(dataCount);
  console.log(price);
  console.log(page);


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
              max={MAXPRICE}
              step={50}
              start={price}
              externalClb={handlePrice}
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
                link={router.pathname}
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
