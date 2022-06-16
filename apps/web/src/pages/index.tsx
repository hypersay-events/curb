import { Button, Group, Stack, TextInput, Text } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

type onSubmitEventType =
  | React.MouseEvent<HTMLButtonElement>
  | React.FormEvent<HTMLFormElement>;

export default function IndexPage() {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();
  const handleSubmit = useCallback(
    (event: onSubmitEventType) => {
      event.preventDefault();
      router.push(`/${roomName}`);
    },
    [roomName, router]
  );

  return (
    <Stack>
      <Text size="xl" weight="bold" color="red">
        Hello, captioner
      </Text>
      <form onSubmit={handleSubmit}>
        <Group align="flex-end" spacing={5}>
          <TextInput
            label="What room should it be?"
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            size="md"
          />
          <Button
            disabled={roomName.length < 2}
            onClick={handleSubmit}
            rightIcon={<IconArrowNarrowRight />}
            size="md"
            type="submit"
          >
            Go
          </Button>
        </Group>
      </form>
    </Stack>
  );
}
