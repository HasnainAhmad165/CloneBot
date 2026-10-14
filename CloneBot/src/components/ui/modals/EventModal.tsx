import { CalendarDays, X } from "lucide-react";
import { Button } from "../../elements/Button/Button";
import type { EventItem } from "../../../utils/types";

export function EventModal({
  event,
  setEvent,
  onClose,
  onSave,
}: {
  event: EventItem;
  setEvent: (e: EventItem) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        className="modal event-modal"
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <button className="modal-close" type="button" onClick={onClose}>
          <X />
        </button>
        <div className="modal-icon">
          <CalendarDays />
        </div>
        <h2>{event.title ? "Edit event" : "New event"}</h2>
        <p>Add a reminder to your personal calendar.</p>
        <label>
          Event title
          <input
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
            placeholder="What do you need to remember?"
            required
          />
        </label>
        <div className="form-row">
          <label>
            Date
            <input
              type="date"
              value={event.date}
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
            />
          </label>
          <label>
            Time
            <input
              type="time"
              value={event.time.includes("PM") ? "15:00" : "10:00"}
              onChange={(e) => setEvent({ ...event, time: e.target.value })}
            />
          </label>
        </div>
        <label>
          Remind me
          <select
            value={event.reminder}
            onChange={(e) => setEvent({ ...event, reminder: e.target.value })}
          >
            <option>30 minutes before</option>
            <option>10 minutes before</option>
            <option>1 hour before</option>
            <option>No reminder</option>
          </select>
        </label>
        <div className="action-row end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save event</Button>
        </div>
      </form>
    </div>
  );
}
