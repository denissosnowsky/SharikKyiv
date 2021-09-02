import { NextPage } from "next";
import ContentLayout from "../components/Layouts/ContentLayout/ContentLayout";
import NavBar from "../components/Layouts/Navbar/Navbar";
import s from "../styles/Page404.module.css";


const Page404: NextPage = () => {
    return(
        <NavBar title="Не найдено страницы">
        <ContentLayout>
            <div className={s.errorMsg}>Не найдено страницы | 404</div>
        </ContentLayout>
      </NavBar>
    )
}

export default Page404;