interface Language {
  value: string;
  label: string;
  flag: string;
  firstLiners: string[];
  dir?: "ltr" | "rtl";
}

const englishFirstLiners = [
  "It was a bright cold day in April, and the clocks were striking thirteen. [test]",
  "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.  [test]",
  "I write this sitting in the kitchen sink. [test]",
  "Ships at a distance have every man’s wish on board. [test]",
  "The story so far: in the beginning, the universe was created. This has made a lot of people very angry and been widely regarded as a bad move. [test]",
];

export const AVAILABLE_LANGUAGES: Record<string, Language> = {
  en: {
    value: "en",
    label: "English",
    flag: "🇬🇧",
    firstLiners: englishFirstLiners,
  },
  fr: {
    value: "fr",
    label: "French",
    flag: "🇫🇷",
    firstLiners: [
      "Bonjour! (ceci est un message d'essai)",
      "Salut! (ceci est un message d'essai)",
    ],
  },
};

export const TARGET_LANGS: Language[] = Object.values(AVAILABLE_LANGUAGES);
