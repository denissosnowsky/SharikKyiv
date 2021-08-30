import type { NextPage } from "next";
import { useMemo } from "react";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import List from "../components/List/List";
import { useAssortmentQuery } from "../store/generated/graphql";
import { arrayConvertor } from "../utils/arrayConvertor";

const Price: () => JSX.Element | undefined = () => {
  const { loading, error, data } = useAssortmentQuery();

  const convertedArr = useMemo(
    () => arrayConvertor(data && data.assortment),
    [data]
  );

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error);
    return;
  }

  return (
    <NavBar title="Цены">
      <ContentLayout>
        <List data={convertedArr} measure={"грн."} />
      </ContentLayout>
    </NavBar>
  );
};

export default Price;
