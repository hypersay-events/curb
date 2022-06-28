interface Language {
  value: string;
  label: string;
  flag: string;
  firstLiners: string[];
  dir?: "ltr" | "rtl";
}

export const englishFirstLiners = [
  "It was a bright cold day in April, and the clocks were striking thirteen. [test]",
  "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.  [test]",
  "I write this sitting in the kitchen sink. [test]",
  "Ships at a distance have every man’s wish on board. [test]",
  "The story so far: in the beginning, the universe was created. This has made a lot of people very angry and been widely regarded as a bad move. [test]",
];

export const TARGET_LANGS: Language[] = [
  {
    value: "en",
    label: "English",
    flag: "🇬🇧",
    firstLiners: englishFirstLiners,
  },
  {
    value: "ar",
    label: "Arabic",
    flag: "AR",
    dir: "rtl",
    firstLiners: ["مرحبًا! (رسالة اختبار)"],
  },
  {
    value: "fa",
    label: "Farsi",
    flag: "FA",
    dir: "rtl",
    firstLiners: ["خوش آمدید! (پیام تست)"],
  },
  {
    value: "he",
    label: "Hebrew",
    flag: "HE",
    dir: "rtl",
    firstLiners: ["ברוך הבא! (הודעת בדיקה)"],
  },
  { value: "it", label: "Italian", flag: "🇮🇹", firstLiners: ["Ciao!"] },
  {
    value: "ro",
    label: "Romanian",
    flag: "🇷🇴",
    firstLiners: [
      "Ana are mere (mesaj de test)",
      "Salut! (mesaj de test)",
      "Bun venit (mesaj de test)",
    ],
  },
  {
    value: "uk",
    label: "Ukrainian",
    flag: "🇺🇦",
    firstLiners: ["Прошу! (тестове повідомлення)"],
  },
];

export default TARGET_LANGS;
