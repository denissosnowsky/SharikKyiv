import { memo } from "react";
import s from "./Video.module.css";

interface VideoProps {
  src: string;
  shadow?: boolean;
}

const Video: React.FC<VideoProps> = memo(({ src, shadow, children }) => {
  return (
    <>
      <video className={s.video} autoPlay muted loop>
        <source src={src} type="video/mp4"></source>
      </video>
      <div className={shadow ? s.wrapper : "none"} />
      {children}
    </>
  );
});

export default Video;
