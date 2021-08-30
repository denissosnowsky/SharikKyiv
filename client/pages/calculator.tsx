import type { NextPage } from "next";
import { useMemo } from "react";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import ListWithCounter from "../components/ListWithCounter/ListWithCounter";
import { useAssortmentQuery } from "../store/generated/graphql";
import { arrayConvertor } from "../utils/arrayConvertor";

const Calculator: () => JSX.Element | undefined = () => {
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
    <NavBar title="Калькулятор">
      <ContentLayout>
        <ListWithCounter measure={"грн."} data={convertedArr} />
      </ContentLayout>
    </NavBar>
  );
};

export default Calculator;
