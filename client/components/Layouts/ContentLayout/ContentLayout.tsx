import { memo } from "react";
import s from "./ContentLayout.module.css";

interface ContentLayoutProps {}

const ContentLayout: React.FC<ContentLayoutProps> = memo(({ children }) => {
  return (
    <div className={s.layout}>
      {children}
      <div className={s.footer}>
        <img src="/smallLogo.svg"></img>
      </div>
    </div>
  );
});

export default ContentLayout;
