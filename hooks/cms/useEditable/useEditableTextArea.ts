import { useEditable } from ".";
import { UseEditableProps, UseEditableReturns } from "./useEditable.types";

export const useEditableTextArea = <ElemType extends HTMLElement>(
  contentElement: Omit<UseEditableProps<string>, "type">
): UseEditableReturns<ElemType, string> =>
  useEditable({ ...contentElement, type: "textarea" });
