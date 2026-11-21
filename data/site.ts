import type { SiteContent } from "@/lib/types";

/**
 * Brand content. The bio is the Instagram bio, verbatim (the notebook says
 * "About is available on Instagram"). Editable from the admin panel later.
 */
export const site: SiteContent = {
  name: "Sangam Designs",
  shortName: "Sangam",
  tagline: "Handmade. Upcycled. Planet-friendly.",
  instagramHandle: "sangam.designs",
  instagramUrl: "https://www.instagram.com/sangam.designs/",
  instagramDm: "https://ig.me/m/sangam.designs",
  /* Facebook page URL not provided yet — links stay hidden while empty. */
  facebookUrl: "",
  email: "sangamdesigns1@gmail.com",
  bio: [
    "Sangam Designs™",
    "#Handcrafted",
    "Upcycle & recycle to craft planet-friendly products. 🌎♻️",
    "Empowering differently abled",
  ],
  copyrightYear: 2026,
};
