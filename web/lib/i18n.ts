import type { Dict } from "@/lib/types";
import { toLocale, type Locale } from "@/lib/locales";

export { locales, defaultLocale, isLocale, toLocale } from "@/lib/locales";
export type { Locale } from "@/lib/locales";

// Imported lazily so each locale ships as its own chunk. The cast is the seam
// between JSON's inferred literal types and Dict — the dictionaries are checked
// against types.ts by reading them, not by the compiler.
const loaders: Record<Locale, () => Promise<unknown>> = {
  en: () => import("@/dictionaries/en.json"),
  zh: () => import("@/dictionaries/zh.json"),
};

export async function getDictionary(locale: string): Promise<Dict> {
  const module = (await loaders[toLocale(locale)]()) as { default: Dict };
  return module.default;
}
