const NEXT_PUBLIC_CAPTIONS_ENDPOINT =
  process.env.NEXT_PUBLIC_CAPTIONS_ENDPOINT || "http://localhost:4554";

export const sdk = {
  addCaption: (data: {
    roomName: string;
    lang: string | null;
    text: string;
    timestampStart: number;
    timestampEnd?: number;
  }) => {
    return fetch(`${NEXT_PUBLIC_CAPTIONS_ENDPOINT}/caption`, {
      method: "POST",
      body: JSON.stringify({
        timestampEnd: +new Date(),
        ...data,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
  },

  listAvailableTranslations: async (data: { roomName: string }) => {
    const res = await fetch(
      `${NEXT_PUBLIC_CAPTIONS_ENDPOINT}/listAvailableTranslations?roomName=${data.roomName}`,
      {
        method: "GET",
      }
    );
    return res.json() as unknown as string[];
  },

  downloadSubtitles: async (data: {
    format: string;
    language: string;
    roomName: string;
  }) => {
    const language = data.language === "original" ? null : data.language;
    const res = await fetch(
      `${NEXT_PUBLIC_CAPTIONS_ENDPOINT}/export?roomName=${
        data.roomName
      }&format=${data.format}${language ? `&language=${language}` : ""}`,
      {
        method: "GET",
      }
    );
    return {
      mimeType: res.headers.get("content-type") || "text/plain",
      content: await res.text(),
    };
  },
};
