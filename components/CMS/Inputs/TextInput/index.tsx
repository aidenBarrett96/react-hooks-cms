import { useCallback } from "react";
import { useCMS } from "../../../../context/cms/CMSContext";

export const TextInput = () => {
  const { isEditing, currentlyEditingElement, handleChange } = useCMS();
  const { label, value } = currentlyEditingElement || {};

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value);
    },
    [handleChange]
  );

  if (!isEditing) return null;

  return (
    <>
      {label && <label htmlFor="text-input">{label}</label>}

      <input
        type="text"
        name="text-input"
        value={value}
        onChange={handleInputChange}
      />
    </>
  );
};
