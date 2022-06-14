import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useTemporaryState } from "../../hooks/useTemporaryState";
import { useRecordStartTime } from "./hooks";

export const CaptionerInput: React.FC<{
  language: string;
  roomName?: string;
}> = ({ language, roomName }) => {
  const [text, setText] = useState("");
  const { startTime, resetTimer } = useRecordStartTime(text);
  const [secCounter, setSecCounter] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useTemporaryState<
    string | null
  >(null, 2000);

  const cleanAll = useCallback(() => {
    setText("");
    resetTimer();
  }, [resetTimer]);

  const onReset = useCallback(() => {
    cleanAll();
    setFeedbackMessage("Subtitle cancelled");
  }, [cleanAll, setFeedbackMessage]);

  const onSend = useCallback(async () => {
    if (roomName && startTime) {
      try {
        const l = language;
        const timestampStart = startTime.getTime();
        cleanAll();
        await fetch("http://localhost:4554/caption", {
          method: "POST",
          body: JSON.stringify({
            roomName,
            lang: l,
            text,
            timestampStart,
            timestampEnd: +new Date(),
          }),
          headers: {
            "content-type": "application/json",
          },
        });
        // @todo call API
        // await sdk.TranscriptAppendManual({
        //   data: {
        //     streamId: streamId,
        //     languageCode: l,
        //     timestampStart,
        //     timestampEnd: +new Date(),
        //     transcript: text,
        //   },
        // });
        setFeedbackMessage("Subtitle sent!");
      } catch (e) {
        console.error(e);
        setFeedbackMessage(
          "Cannot send subtitle, try again or reload the page"
        );
      }
    }
  }, [roomName, startTime, language, cleanAll, text, setFeedbackMessage]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (startTime !== null) {
      interval = setInterval(() => {
        setSecCounter(dayjs().diff(startTime, "second"));
      }, 1000);
    } else {
      setSecCounter(null);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [startTime]);

  const onKeyUp = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.key === "Enter") {
        onSend();
      }
      if (e.key === "Escape") {
        onReset();
      }
    },
    [onReset, onSend]
  );

  return (
    <div style={{ display: "flex", alignItems: "stretch", width: "100%" }}>
      {/* <Text>Create subtitles for {language.language}</Text> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          width: "100%",
        }}
      >
        <input
          type="text"
          placeholder="Insert captions and hit Enter"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={onKeyUp}
          disabled={!roomName}
        />

        <button onClick={onSend} disabled={!text || !roomName}>
          Send
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          width: "100%",
        }}
      >
        <span>•</span>
        <>
          <div>
            {startTime ? (
              <span>Recording subtitle</span>
            ) : feedbackMessage ? null : (
              <span>Waiting</span>
            )}
            {feedbackMessage ? <span>{feedbackMessage}</span> : null}
          </div>
          <span>•</span>
        </>
        <span style={{ color: (secCounter || 0) > 59 ? "red" : "" }}>
          {secCounter || 0} seconds
        </span>
        <span>•</span>
        <span style={{ color: text.length > 40 ? "red" : "" }}>
          {text.length} characters
        </span>
        <span>•</span>
        <button onClick={onReset}>reset</button>
      </div>
    </div>
  );
};
