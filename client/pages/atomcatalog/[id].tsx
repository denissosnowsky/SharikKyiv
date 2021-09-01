import { useRouter } from "next/router";
import ContentLayout from "../../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../../components/Layouts/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";
import Product from "../../components/Product/Product";
import { useBalloonQuery } from "../../store/generated/graphql";

interface BouqItemProps {}

const BouqItem: React.FC<BouqItemProps> = () => {
  const router = useRouter();

  const { loading, error, data } = useBalloonQuery({
    ssr: false,
    variables: {
      id: router.query.id! as string,
    },
  });

  if (error) {
    console.log(error);
    return;
  }

  const balloon = data?.balloon!;

  return (
    <NavBar title={"Товар"}>
      <ContentLayout>
        {loading ? <Loading /> : (
          <Product
            title={balloon!.name}
            subTitle={balloon!.subname}
            desc={balloon!.description}
            code={balloon!.code}
            img={balloon!.image}
            price={balloon!.price}
            measure={"грн."}
            basketStatus={balloon!.basketStatus!}
          />
        )}
      </ContentLayout>
    </NavBar>
  );
};

export default BouqItem;
