import { useMemo } from "react";
import { useCMS } from "../../../context/cms/CMSContext";
import { CMSContentType } from "../../../types/CMS.types";
import { TextAreaInput } from "../Inputs/TextAreaInput";
import { TextInput } from "../Inputs/TextInput";

const componentMappings: Partial<Record<CMSContentType, React.FC>> = {
  text: TextInput,
  textarea: TextAreaInput,
};

export const EditingMapper = () => {
  const { currentlyEditingElement } = useCMS();

  const Component = useMemo(() => {
    if (!currentlyEditingElement) return null;
    return componentMappings[currentlyEditingElement?.type];
  }, [currentlyEditingElement]);

  if (!Component) {
    console.error("No component found for this content type");
    return null;
  }

  return <Component />;
};
