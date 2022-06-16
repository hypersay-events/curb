import {
  Breadcrumbs,
  Button,
  Container,
  Group,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import dayjs from "dayjs";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTemporaryState } from "../../hooks/useTemporaryState";
import { useRecordStartTime } from "./hooks";

const languages = ["en", "it", "ro", "fr"];

export const INPUT_LANGUAGES = [
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "it", label: "Italian", flag: "🇮🇹" },
  { value: "ro", label: "Romanian", flag: "🇷🇴" },
  { value: "fr", label: "French", flag: "🇫🇷" },
];

export const CaptionerInput: React.FC<{
  roomName?: string;
}> = ({ roomName }) => {
  const [language, setLanguage] = useState<string | null>("");
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

  const onKeyUp = useCallback<React.KeyboardEventHandler<HTMLTextAreaElement>>(
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
    <Stack align="stretch" style={{ width: "100%" }}>
      <Group style={{ justifyContent: "space-between" }}>
        <Select
          searchable
          clearable
          value={language}
          onChange={setLanguage}
          data={INPUT_LANGUAGES}
          placeholder="input language"
          style={{ width: "fit-content" }}
        />
        <Breadcrumbs separator="•" style={{ alignItems: "center" }}>
          <Text>
            {startTime ? (
              <span>Recording subtitle</span>
            ) : feedbackMessage ? null : (
              <span>Waiting</span>
            )}
            {feedbackMessage ? <span>{feedbackMessage}</span> : null}
          </Text>
          <Text style={{ color: (secCounter || 0) > 59 ? "red" : "" }}>
            {secCounter || 0} seconds
          </Text>
          <Text style={{ color: text.length > 40 ? "red" : "" }}>
            {text.length} characters
          </Text>
          <UnstyledButton
            onClick={onReset}
            color="gray"
            sx={{ ":hover": { textDecoration: "underline" } }}
          >
            reset
          </UnstyledButton>
        </Breadcrumbs>
      </Group>

      <Group>
        <Textarea
          autosize
          placeholder="Insert captions and hit Enter"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={onKeyUp}
          disabled={!roomName}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          size="xl"
          style={{ flexGrow: 1 }}
          radius="md"
        />

        <Button
          onClick={onSend}
          disabled={!text || !roomName}
          size="xl"
          color="gray"
        >
          Send
        </Button>
      </Group>
    </Stack>
  );
};
{
  /* <div style={{ display: "flex", alignItems: "stretch", width: "100%" }}>

<Text>Create subtitles for {language.language}</Text>
<div
  style={{
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    width: "100%",
  }}
>

</div>

</div> */
}
