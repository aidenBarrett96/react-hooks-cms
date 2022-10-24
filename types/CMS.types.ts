export type CMSContentType = "text" | "textarea" | "image";

export interface CMSContentElement {
  id: string;
  type: CMSContentType;
  value: any;
  label?: string;
}

export interface ImageElement {
    src: string;
    alt: string;
}