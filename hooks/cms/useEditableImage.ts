import { ImageElement } from "../../types/CMS.types";
import { useEditable } from "./useEditable";
import {
  UseEditableProps,
  UseEditableReturns,
} from "./useEditable/useEditable.types";

export const useEditableImage = <ElemType extends HTMLElement>(
  contentElement: Omit<UseEditableProps<ImageElement>, "type">
): UseEditableReturns<ElemType, ImageElement> =>
  useEditable({ ...contentElement, type: "image" });
