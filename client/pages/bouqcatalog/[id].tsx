import ContentLayout from "../../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../../components/Layouts/Navbar/Navbar";
import Product from "../../components/Product/Product";

interface BouqItemProps {}

const BouqItem: React.FC<BouqItemProps> = () => {
  return <NavBar title={'Товар'}>
    <ContentLayout>
      <Product />
    </ContentLayout>
  </NavBar>;
};

export default BouqItem;

