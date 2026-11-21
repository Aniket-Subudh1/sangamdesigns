import type { Product } from "@/lib/types";
import { bags } from "./bags";
import { bedspreads } from "./bedspreads";
import { cushionCovers } from "./cushion-covers";
import { diwanCovers } from "./diwan-covers";
import { duvetCovers } from "./duvet-covers";
import { quilts } from "./quilts";
import { singleDohars } from "./single-dohars";
import { tableMats } from "./table-mats";

export const products: Product[] = [
  ...quilts,
  ...duvetCovers,
  ...bedspreads,
  ...singleDohars,
  ...diwanCovers,
  ...tableMats,
  ...cushionCovers,
  ...bags,
];
