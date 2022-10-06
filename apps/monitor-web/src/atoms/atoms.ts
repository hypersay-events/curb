import { atom } from "jotai";
import { AVAILABLE_LANGUAGES } from "../utils/languages";

export const languageAtom = atom<keyof typeof AVAILABLE_LANGUAGES | null>(null);
export const roomAtom = atom<string>("");
