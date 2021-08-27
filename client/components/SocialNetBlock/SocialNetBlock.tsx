interface SocialNetBlockProps {
  size?: string;
  margin?: string;
  title: string;
  href: string;
  image: string;
}

const SocialNetBlock: React.FC<SocialNetBlockProps> = ({
  size = "10px",
  margin,
  title,
  href,
  image,
}) => {
  return (
    <div style={{ height: size, width: size, margin: margin }}>
      <a title={title} href={href} target="_blank">
        <img
          src={image}
          alt={`Написать в ${title}`}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
          }}
        />
      </a>
    </div>
  );
};

export default SocialNetBlock;
