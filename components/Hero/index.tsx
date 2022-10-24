import styles from "./_hero.module.scss";
import { defaultHeroCopy } from "./hero.copy";
import { useEditableText } from "../../hooks/cms/useEditable/useEditableText";
import { useEditableTextArea } from "../../hooks/cms/useEditable/useEditableTextArea";
import defaultHeroImage from "../../assets/code_stock.jpg";
import { useEditableImage } from "../../hooks/cms/useEditableImage";

const { title: defaultTitle, description: defaultDescription } =
  defaultHeroCopy;

export const Hero = () => {
  const [titleRef, title] = useEditableText<HTMLHeadingElement>({
    defaultValue: defaultTitle,
    id: "hero-title",
  });

  const [descriptionRef, description] =
    useEditableTextArea<HTMLParagraphElement>({
      defaultValue: defaultDescription,
      id: "hero-description",
    });

  const [heroImageRef, heroImage] = useEditableImage<HTMLImageElement>({
    defaultValue: {
      src: defaultHeroImage.src,
      alt: "A picture of a computer screen with code on it",
    },
    id: "hero-image",
  });

  return (
    <div className={styles.hero}>
      <h1 className={styles.title} ref={titleRef}>
        {title}
      </h1>
      <p className={styles.description} ref={descriptionRef}>
        {description}
      </p>
      <img {...heroImage} ref={heroImageRef} />
    </div>
  );
};
