import { useMemo } from "react";
import { useCMS } from "../../../context/cms/CMSContext";
import { joinClasses } from "../../../misc/joinClasses";
import { EditingMapper } from "../EditingMapper";
import styles from "./ContentEditingScreen.module.scss";

export const ContentEditingScreen = () => {
  const { isEditing, stopEditing } = useCMS();

  const containerClasses = useMemo(
    () =>
      isEditing
        ? joinClasses([styles.container, styles.active])
        : styles.container,
    [isEditing]
  );

  return (
    <div className={containerClasses}>
      <h2>Content Editing Screen</h2>
      <EditingMapper />
      <button onClick={stopEditing}>Stop Editing</button>
    </div>
  );
};
