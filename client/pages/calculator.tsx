import { useMemo } from "react";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import ListWithCounter from "../components/ListWithCounter/ListWithCounter";
import Loading from "../components/Loading/Loading";
import { useAssortmentQuery } from "../store/generated/graphql";
import { arrayConvertor } from "../utils/arrayConvertor";

const Calculator: () => JSX.Element | undefined = () => {
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
    <NavBar title="Калькулятор">
      <ContentLayout>
        {loading ? (
          <Loading />
        ) : (
          <ListWithCounter measure={"грн."} data={convertedArr} />
        )}
      </ContentLayout>
    </NavBar>
  );
};

export default Calculator;
