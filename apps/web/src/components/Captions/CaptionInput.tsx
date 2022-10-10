import {
  Breadcrumbs,
  Button,
  Group,
  Select,
  Stack,
  Text,
  Textarea,
  UnstyledButton,
} from "@mantine/core";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { sdk } from "../../business/client";
import { INPUT_LANGUAGES } from "../../business/languageList";
import { useTemporaryState } from "../../hooks/useTemporaryState";
import { useRecordStartTime } from "./hooks";

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
        await sdk.addCaption({
          roomName,
          lang: l,
          text,
          timestampStart,
        });

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
          styles={(theme) => ({
            input: {
              // color: "#ffffff !important",
              fontWeight: "bold",
              backgroundColor: language
                ? theme.colors.gray[7]
                : theme.colors.hsOrange[8],
              "::placeholder": {
                color: "rgba(255,255,255,0.5)",
              },
            },
          })}
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
          autoFocus
          placeholder={
            !language
              ? "☝️ Select input language first"
              : "Type captions and hit Enter"
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={onKeyUp}
          disabled={!roomName || !language}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          size="xl"
          style={{ flexGrow: 1 }}
          radius="md"
          // variant="filled"
          styles={(theme) => ({
            input: {
              "::placeholder": {
                color: "rgba(255,255,255,0.5)",
              },
              ":focus": {
                borderColor: `${theme.white} !important`,
              },
              ":focus-within": {
                borderColor: `${theme.white} !important`,
              },
            },
            filledVariant: {
              color: "#ffffff !important",
              fontWeight: "bold",
              backgroundColor: language ? theme.colors.hsOrange[8] : "",
            },
          })}
        />

        <Button
          onClick={onSend}
          disabled={!text || !roomName}
          size="xl"
          // color="gray"
          radius="md"
          variant="filled"
          styles={(theme) => ({
            root: {
              ":disabled": {
                backgroundColor: `${theme.colors.dark[3]} !important`,
              },
            },
          })}
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
