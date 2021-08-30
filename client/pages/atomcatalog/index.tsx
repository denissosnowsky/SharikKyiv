import type { NextPage } from "next";
import ContentLayout from "../../components/Layouts/ContentLayout/ContentLayout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../../components/Layouts/Navbar/Navbar";
import CardComponent from "../../components/Card/CardComponent";
import DropdownBtn from "../../components/DropdownBtn/DropdownBtn";
import DropdownBtnWithColor from "../../components/DropdownBtnWithColor/DropdownBtnWithColor";
import { useCallback, useEffect, useState } from "react";
import RangeInput from "../../components/RangeInput/RangeInput";
import {
  useAllBalloonsQuery,
  useBalloonsQuery,
  useCategoriesQuery,
  useColorsQuery,
} from "../../store/generated/graphql";
import { NetworkStatus } from "@apollo/client";
import PaginationFC from "../../components/Pagination/Pagination";
import { useRouter } from "next/router";

const AtomCatalog: NextPage = () => {
  const TAKE = 3;
  const MAXPRICE = 2000;

  const [page, setPage] = useState(1);
  const [price, setPrice] = useState(MAXPRICE);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [catName, setCatName] = useState<string>("");
  const [colName, setColName] = useState<string>("");

  useEffect(()=>{
    const newState = category ? dataCategory?.categories?.find(o=>o?.id===category)?.name : 'Выбрать категорию | Все';
    setCatName(newState!);
  }, [category]);

  useEffect(()=>{
    const newState = color ? dataColor?.colors?.find(o=>o?.id===color)?.name : 'Выбрать цвет | Все';
    setColName(newState!);
  }, [color]);

  const router = useRouter();

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
      price: price,
      categoryId: category,
      colorId: color,
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    loading: loadingCount,
    error: errorCount,
    data: dataCount,
    fetchMore: fetchMoreCount,
    networkStatus: networkStatusCount,
  } = useAllBalloonsQuery({
    ssr: false,
    variables: {
      price: price,
      categoryId: category,
      colorId: color,
    },
  });

  const {
    loading: loadingCategory,
    error: errorCategory,
    data: dataCategory,
  } = useCategoriesQuery();

  const {
    loading: loadingColor,
    error: errorColor,
    data: dataColor,
  } = useColorsQuery({
    ssr: false,
  });

  useEffect(() => {
    fetchMore({
      variables: {
        skip: (page - 1) * TAKE,
        take: TAKE,
        price: price,
        categoryId: category,
        colorId: color,
      },
    });
  }, [page, price, category, color]);

  const handleFilter = useCallback(
    (type: "RANGE" | "CATEGORY" | "COLOR") => (filter: number | string | undefined) => {
      fetchMoreCount({
        variables: {
          price: type === "RANGE" ? filter : price,
          categoryId: type === "CATEGORY" ? filter : category,
          colorId: type === "COLOR" ? filter : color,
        },
      });
      setPage(1);
      type === "RANGE" && setPrice(filter as number);
      type === "CATEGORY" && setCategory(filter as string);
      type === "COLOR" && setColor(filter as string);
    },
    []
  );

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
              title={catName}
              items={dataCategory?.categories!}
              externalClb={handleFilter("CATEGORY")}
            />
          </Col>
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
              externalClb={handleFilter("RANGE")}
            />
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            xs={4}
          >
            <DropdownBtnWithColor
              title={colName}
              items={dataColor?.colors!}
              externalClb={handleFilter("COLOR")}
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
                link={router.pathname}
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
