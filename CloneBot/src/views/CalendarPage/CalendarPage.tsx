import { Bell, ChevronLeft, ChevronRight, Plus, Trash2, Pencil } from "lucide-react";
import { Button, Card } from "../../components/elements";
import type { EventItem } from "../../utils/types";
import { useState } from "react";

export function CalendarPage({
  events,
  onNew,
  onEdit,
  onDelete,
}: {
  events: EventItem[];
  onNew: () => void;
  onEdit: (e: EventItem) => void;
  onDelete: (id: number) => void;
}) {
  const [month, setMonth] = useState(new Date(2026, 9, 1));
  const [weekView, setWeekView] = useState(false);
  const start = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (start.getDay() + 6) % 7;
  const count = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  const dayCells = Array.from({ length: 42 }, (_, i) => {
    const d = i - offset + 1;
    return d < 1
      ? {
          day: new Date(month.getFullYear(), month.getMonth(), d).getDate(),
          outside: true,
          date: new Date(month.getFullYear(), month.getMonth(), d),
        }
      : d > count
        ? {
            day: new Date(month.getFullYear(), month.getMonth(), d).getDate(),
            outside: true,
            date: new Date(month.getFullYear(), month.getMonth(), d),
          }
        : {
            day: d,
            outside: false,
            date: new Date(month.getFullYear(), month.getMonth(), d),
          };
  });
  const listEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div className="columns calendar-columns">
      <div className="stack">
        <div className="calendar-toolbar">
          <Button onClick={onNew}>
            <Plus size={16} /> New event
          </Button>
          <label className="integration-toggle">
            <span>Calendar sync</span>
            <span className="future-tag">Coming later</span>
          </label>
          <div className="view-toggle">
            <button
              className={!weekView ? "selected" : ""}
              onClick={() => setWeekView(false)}
            >
              Month
            </button>
            <button
              className={weekView ? "selected" : ""}
              onClick={() => setWeekView(true)}
            >
              Week
            </button>
          </div>
        </div>
        <Card className="month-card">
          <div className="month-title">
            <h3>
              {month.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <div>
              <button
                className="icon-button"
                onClick={() =>
                  setMonth(
                    new Date(month.getFullYear(), month.getMonth() - 1, 1),
                  )
                }
              >
                <ChevronLeft />
              </button>
              <button
                className="icon-button"
                onClick={() =>
                  setMonth(
                    new Date(month.getFullYear(), month.getMonth() + 1, 1),
                  )
                }
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="calendar-grid">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <strong className="weekday" key={d}>
                {d}
              </strong>
            ))}
            {dayCells.map((c, i) => {
              const dateKey = `${c.date.getFullYear()}-${String(c.date.getMonth() + 1).padStart(2, "0")}-${String(c.day).padStart(2, "0")}`;
              const dayEvents = events.filter((e) => e.date === dateKey);
              return (
                <div
                  key={i}
                  className={`calendar-cell ${c.outside ? "outside" : ""}`}
                >
                  <span>{c.day}</span>
                  {dayEvents.map((e) => (
                    <button
                      key={e.id}
                      className={`calendar-event ${e.color}`}
                      onClick={() => onEdit(e)}
                    >
                      {e.title}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      <div className="stack">
        <Card className="reminder-feature">
          <span className="pill translucent">
            <Bell size={13} /> Your reminders
          </span>
          <h3>Stay on top of what matters</h3>
          <p>Confirmed commitments and events, all in one place.</p>
          <Button variant="secondary" onClick={onNew}>
            Add an event
          </Button>
        </Card>
        <Card className="upcoming-card">
          <div className="card-heading">
            <h3>Upcoming events</h3>
            <button className="text-button" onClick={onNew}>
              <Plus size={15} /> Add new
            </button>
          </div>
          {listEvents.map((e) => (
            <div className="upcoming-event" key={e.id}>
              <span className={`event-dot ${e.color}`} />
              <div>
                <strong>{e.title}</strong>
                <small>
                  {new Date(`${e.date}T12:00:00`).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  , {e.time}
                </small>
              </div>
              <button
                className="icon-button"
                onClick={() => onEdit(e)}
                title="Edit"
              >
                <Pencil size={15} />
              </button>
              <button
                className="icon-button danger-icon"
                onClick={() => onDelete(e.id)}
                title="Delete"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          {!listEvents.length && <p className="muted">No events yet.</p>}
        </Card>
      </div>
    </div>
  );
}
