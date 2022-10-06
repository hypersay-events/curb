import { atom } from "jotai";

type Languages = "en" | "fr";

export const languageAtom = atom<Languages | null>(null);
