import type { NextPage } from "next";
import { useMemo } from "react";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import List from "../components/List/List";
import Loading from "../components/Loading/Loading";
import { useAssortmentQuery } from "../store/generated/graphql";
import { arrayConvertor } from "../utils/arrayConvertor";

const Price: () => JSX.Element | undefined = () => {
  const { loading, error, data } = useAssortmentQuery();

  const convertedArr = useMemo(
    () => arrayConvertor(data && data.assortment),
    [data]
  );

  if (error) {
    console.log(error);
    return;
  }

  return (
    <NavBar title="Цены">
      <ContentLayout>
        {loading ? <Loading /> : <List data={convertedArr} measure={"грн."} />}
      </ContentLayout>
    </NavBar>
  );
};

export default Price;
