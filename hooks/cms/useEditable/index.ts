import { RefObject, useEffect, useRef, useState } from "react";
import { useCMS } from "../../../context/cms/CMSContext";
import { CMSContentElement } from "../../../types/CMS.types";
import { UseEditableProps, UseEditableReturns } from "./useEditable.types";

export const useEditable = <
  ElemType extends HTMLElement,
  ExpectedReturn = string
>(
  contentElement: UseEditableProps<ExpectedReturn>
): UseEditableReturns<ElemType, ExpectedReturn> => {
  const { defaultValue, id } = contentElement;
  const [registered, setRegistered] = useState<boolean>(false);

  const { startEditing, registerContentElement, watchElementValue } = useCMS();

  const value = watchElementValue<ExpectedReturn>(id);

  // Register the content element with the CMS context.
  useEffect(() => {
    if (registered) return;

    registerContentElement({
      ...contentElement,
      value: defaultValue,
    });

    setRegistered(true);
  }, [registerContentElement, registered, contentElement, defaultValue]);

  const ref = useRef<ElemType>(null);

  useEffect(() => {
    if (!registered) return;

    const element = ref.current;
    if (!element) return;

    const handleInput = () => {
      startEditing(id);
    };

    element.addEventListener("click", handleInput);
  }, [id, ref, registered, startEditing]);

  // Return as mixture of array and object to allow destructuring.
  return Object.assign([ref, value], {
    ref,
    value,
  }) as UseEditableReturns<ElemType, ExpectedReturn>;
};
