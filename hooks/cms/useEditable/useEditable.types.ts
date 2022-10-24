import { RefObject } from "react";
import { CMSContentElement } from "../../../types/CMS.types";

export type UseEditableProps<ExpectedReturn> = Omit<
  CMSContentElement,
  "value"
> & {
  defaultValue: ExpectedReturn;
};

export type UseEditableReturns<ElemType, ExpectedReturn> = [
  RefObject<ElemType>,
  ExpectedReturn
] & {
  ref: RefObject<ElemType>;
  value: ExpectedReturn;
};

export type UseEditableInstance = <
  ElemType extends HTMLElement,
  ExpectedReturn = string
>(
  contentElement: UseEditableProps<ExpectedReturn>
) => UseEditableReturns<ElemType, ExpectedReturn>;
