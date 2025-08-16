import { Modal, Button, Group, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";

import "./AvailabilityModal.css";
import { useEffect } from "react";
import type { CalendarEvent } from "../interfaces/AvailabilityInterfaces";

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CalendarEvent) => void;
}

export const AvailabilityModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AvailabilityModalProps) => {
  const form = useForm<CalendarEvent>({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    validateInputOnChange: true,
    initialValues: {
      name: "",
      eventName: "",
      startDate: "",
      endDate: "",
    },
  });

  const handleSubmit = (values: CalendarEvent) => {
    onSubmit(values);
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen]);

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
          <div className="availability-modal-field">
            <label className="availability-modal-label">Event name</label>
            <Input
              placeholder="Enter your event's name"
              {...form.getInputProps("eventName")}
            />
          </div>
          <DateTimePicker
            label="Start date"
            placeholder="Start date"
            {...form.getInputProps("startDate")}
            timePickerProps={{
              withDropdown: true,
              popoverProps: { withinPortal: false },
              format: "12h",
            }}
          />
          <DateTimePicker
            label="End date"
            placeholder="End date"
            {...form.getInputProps("startDate")}
            timePickerProps={{
              withDropdown: true,
              popoverProps: { withinPortal: false },
              format: "12h",
            }}
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
