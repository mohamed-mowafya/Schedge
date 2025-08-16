import { Modal, Button, Group, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateTimePicker, TimePicker } from "@mantine/dates";

import "./AvailabilityModal.css";

interface AvailabilityFormValues {
  name: string;
  timeSlot: string;
}

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AvailabilityFormValues) => void;
}

export const AvailabilityModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AvailabilityModalProps) => {
  const form = useForm<AvailabilityFormValues>({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    validateInputOnChange: true,
    initialValues: {
      name: "",
      timeSlot: "",
    },
    validate: {
      name: (value) => (value.length < 1 ? "Name is required" : null),
      timeSlot: (value) =>
        value.length < 1 ? "Please select a time slot" : null,
    },
  });

  const handleSubmit = (values: AvailabilityFormValues) => {
    onSubmit(values);
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Add Your Availability"
      centered
      size="md"
      className="availability-modal"
    >
      <div className="availability-modal-form">
        <p className="availability-modal-description">
          Let others know when you're available for this session.
        </p>

        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="availability-modal-form"
        >
          <div className="availability-modal-field">
            <label className="availability-modal-label">Your Name</label>
            <Input
              placeholder="Enter your name"
              {...form.getInputProps("name")}
            />
          </div>
            <DateTimePicker
              label="Date and start time"
              placeholder="Date and start time"
              timePickerProps={{
                withDropdown: true,
                popoverProps: { withinPortal: false },
                format: "12h",
              }}
            />
            <TimePicker
              label="Enter time (12h format)"
              withSeconds
              withDropdown
              format="12h"
              mt="md"
            />
          <Group className="availability-modal-buttons">
            <Button
              variant="outline"
              onClick={onClose}
              className="availability-modal-cancel-btn"
            >
              Cancel
            </Button>
            <Button type="submit" className="availability-modal-submit-btn">
              Add Availability
            </Button>
          </Group>
        </form>
      </div>
    </Modal>
  );
};
