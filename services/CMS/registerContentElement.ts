import { CMSContentType } from "../../types/CMS.types";

export interface RegisterContentElementOptions {
  /** The type of the content element */
  type: CMSContentType;
}

/**
 * Registers a content element with the CMS context.
 *
 * @param id The ID of the content element.
 * @param options The options for the content element.
 */
export type RegisterContentElement = (
  id: string,
  options: RegisterContentElementOptions
) => void;

export const registerContentElement: RegisterContentElement = (
  id,
  options
) => {};
