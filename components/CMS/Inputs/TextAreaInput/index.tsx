import { useCallback } from "react";
import { useCMS } from "../../../../context/cms/CMSContext";

export const TextAreaInput = () => {
  const { isEditing, currentlyEditingElement, handleChange } = useCMS();
  const { label, value } = currentlyEditingElement || {};

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleChange(e.target.value);
    },
    [handleChange]
  );

  if (!isEditing) return null;

  return (
    <>
      {label && <label htmlFor="text-input">{label}</label>}

      <textarea name="text-input" value={value} onChange={handleInputChange} />
    </>
  );
};
