import type { GalleryImage } from "@/lib/types";

/*
 * Extra photos from the two Google Photos albums ("Product Photography" and
 * "Bedsheet and Bag Designs") that aren't matched to a catalog item.
 * Product photos are added to the gallery automatically.
 */
const g = (id: string, tag: string, alt: string): GalleryImage => ({
  src: `/gallery/${id}.webp`,
  tag,
  alt,
});

const Q = "Bedding";

export const galleryExtras: GalleryImage[] = [
  g("a022", Q, "Strip-pieced patchwork in teal, orange and khaki"),
  g("a156", Q, "Close-up of scrap patchwork squares"),
  g("b022", Q, "Crazy-quilt patchwork detail"),
  g("a140", Q, "Pinwheel patchwork detail"),
  g("a013", Q, "Blue appliqué on black and white squares"),
  g("a020", Q, "Strip patchwork bedcover with a purple border"),
  g("a029", Q, "Pink and red patchwork bedcover"),
  g("a031", Q, "Pink and red patchwork squares"),
  g("a036", Q, "Red and peach block-print bedcover"),
  g("a043", Q, "Peach bedcover with fan appliqué"),
  g("a055", Q, "Yellow bedcover with butterfly appliqué"),
  g("a064", Q, "Pink and maroon squares with star appliqué"),
  g("a069", Q, "Blue floral bedcover with yellow sashing"),
  g("a072", Q, "Pink floral patchwork bedcover"),
  g("a076", Q, "Pale pink patchwork bedcover"),
  g("a104", Q, "Pink bedcover with patchwork appliqué"),
  g("a106", Q, "Off-white floral bedcover with brown frames"),
  g("a122", Q, "Green squares with blue flower appliqué"),
  g("a145", Q, "Brown bedcover with red motif squares"),
  g("a152", Q, "Lilac strip patchwork detail"),
  g("a155", Q, "Purple-bordered patchwork bedcover"),
  g("a162", Q, "Pink bedcover with flower appliqué"),
  g("a165", Q, "Polka-dot bedcover with khaki squares"),
  g("a174", Q, "Striped border bedcover with diamond appliqué"),
  g("a191", Q, "Cream bedcover with black diamond squares"),
  g("a195", Q, "Peach and lime patchwork bedcover"),
  g("b005", Q, "Indigo and white patchwork bedcover"),
  g("b012", Q, "Navy and grey checked bedcover"),
  g("b019", Q, "Pink and purple diamond patchwork"),
  g("b044", Q, "Navy patchwork with house appliqué"),
  g("b055", Q, "Yellow and green single patchwork dohar"),
  g("b056", Q, "Coral and maroon single patchwork dohar"),
  g("b061", Q, "Maroon and pink squares with flower appliqué"),
  g("b010", "Bedsheets", "White bedsheet with a khaki striped band"),
  g("b028", "Bedsheets", "Orange floral bedsheet"),
  g("b031", "Bedsheets", "Yellow floral bedsheet"),
  g("b033", "Bedsheets", "Yellow daisy bedsheet"),
  g("b037", "Bedsheets", "White bedsheet with pink rose squares"),
  g("b058", "Bedsheets", "Cream bedsheet with a maroon woven band"),
  g("a197", "Living", "Table mats on a gingham tablecloth"),
  g("a199", "Living", "Floral table mats laid for six"),
  g("a210", "Living", "Navy and red print table mats"),
  g("a087", "Custom Orders", "Custom patchwork event tote"),
  g("a090", "Custom Orders", "Custom conference bags"),
  g("b072", "Custom Orders", "Custom woven stoles"),
  g("b074", "Custom Orders", "Custom stoles with woven motifs"),
  g("b078", "Custom Orders", "Custom patchwork totes"),
  g("b080", "Custom Orders", "Custom totes with pink patchwork"),
];
