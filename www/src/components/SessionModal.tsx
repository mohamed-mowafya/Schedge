import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

interface SessionFormValues {
  sessionType: string;
}

interface SessionModalProps {
  onSubmit: (values: SessionFormValues, close: () => void) => void;
}

export const SessionModal = (props: SessionModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<SessionFormValues>({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    validateInputOnChange: true,
    initialValues: {
      sessionType: "",
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Session Details"
        centered
        styles={{
          header: { backgroundColor: "#1a1b1e", color: "#fff" },
          content: { backgroundColor: "#1a1b1e" },
        }}
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Create a new session to start scheduling with your team.
          </p>
          <p className="text-gray-400">What will your session be used for ?</p>

          <form onSubmit={form.onSubmit((values) => props.onSubmit(values, close))}>
            <Select
              label="Session Type"
              placeholder="Select session type"
              styles={{
                label: { color: "#fff" },
                input: {
                  backgroundColor: "#25262b",
                  color: "#fff",
                  borderColor: "#373A40",
                },
              }}
              data={[
                { value: "friends_meeting", label: "Friends" },
                { value: "work_meeting", label: "Work" },
                { value: "other", label: "Other" },
              ]}
              {...form.getInputProps("sessionType")}
            />
            <Group justify="flex-end" mt="md">
              <Button
                styles={{
                  root: {
                    backgroundColor: "#9333ea",
                    "&:hover": { backgroundColor: "#7e22ce" },
                    fontWeight: 600,
                    borderRadius: "0.5rem",
                  },
                }}
                type="submit"
              >
                Create
              </Button>
            </Group>
          </form>
        </div>
      </Modal>

      <button
        className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:transform"
        onClick={open}
      >
        Create Schedule
      </button>
    </>
  );
};
