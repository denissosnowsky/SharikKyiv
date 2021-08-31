import ContentLayout from "../../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../../components/Layouts/Navbar/Navbar";
import Product from "../../components/Product/Product";
import { useBouquetQuery } from "../../store/generated/graphql";
import { useRouter } from "next/router";
import Loading from "../../components/Loading/Loading";

interface BouqItemProps {}

const BouqItem: React.FC<BouqItemProps> = () => {
  const router = useRouter();

  const { loading, error, data } = useBouquetQuery({
    ssr: false,
    variables: {
      id: router.query.id! as string,
    },
  });

  if (error) {
    console.log(error);
  }

  const bouquet = data && data?.bouquet;

  return (
    <NavBar title={"Товар"}>
      <ContentLayout>
        {loading ? (
          <Loading />
        ) : (
          <Product
            title={bouquet!.name}
            subTitle={bouquet!.subname}
            desc={bouquet!.description}
            code={bouquet!.code}
            img={bouquet!.image}
            price={bouquet!.price}
            measure={"грн."}
          />
        )}
      </ContentLayout>
    </NavBar>
  );
};

export default BouqItem;
