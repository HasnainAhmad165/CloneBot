import { Check, X, CheckCircle2 } from "lucide-react";
import { Button, Card } from "../../components/elements";
import type { Fact } from "../../utils/types";

export function KnowledgeReview({
  facts,
  activeFilter,
  setActiveFilter,
  onApprove,
  onEdit,
  onDismiss,
  onEventSave,
}: {
  facts: Fact[];
  activeFilter: string;
  setActiveFilter: (s: string) => void;
  onApprove: (id: number) => void;
  onEdit: (f: Fact) => void;
  onDismiss: (id: number) => void;
  onEventSave: () => void;
}) {
  const tabs = ["All", "Fact", "Person", "Event", "Preference", "Commitment"];
  return (
    <div className="columns review-columns">
      <div className="stack">
        <div className="review-toolbar">
          <div className="filter-tabs">
            {tabs.map((t) => (
              <button
                key={t}
                className={activeFilter === t ? "active" : ""}
                onClick={() => setActiveFilter(t)}
              >
                {t}
                {t === "All" && <span>{facts.length}</span>}
              </button>
            ))}
          </div>
          <Button onClick={() => facts.forEach((f) => onApprove(f.id))}>
            <Check size={16} /> Approve all
          </Button>
        </div>
        <Card className="table-card">
          <div className="review-table-head">
            <span>Type</span>
            <span>What your assistant found</span>
            <span>Source</span>
            <span>Action</span>
          </div>
          {facts.length ? (
            facts.map((f) => (
              <div className="review-row" key={f.id}>
                <span>
                  <i className={`type-tag ${f.type.toLowerCase()}`}>{f.type}</i>
                </span>
                <strong>{f.text}</strong>
                <small>{f.source}</small>
                <span className="row-actions">
                  <button
                    className="button secondary compact"
                    onClick={() => onEdit(f)}
                  >
                    Edit
                  </button>
                  <button
                    className="button primary compact"
                    onClick={() => onApprove(f.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="icon-button dismiss"
                    title="Dismiss"
                    onClick={() => onDismiss(f.id)}
                  >
                    <X size={16} />
                  </button>
                </span>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <CheckCircle2 />
              <h3>All caught up</h3>
              <p>No {activeFilter.toLowerCase()} items need review.</p>
            </div>
          )}
        </Card>
      </div>
      <div className="stack">
        <Card className="event-editor">
          <h3>Detected event</h3>
          <p className="muted">Confirm details before adding an event.</p>
          <label>
            Event title
            <input defaultValue="Meeting on Tuesday at HQ Office" />
          </label>
          <label>
            Date
            <input type="date" defaultValue="2026-10-13" />
          </label>
          <label>
            Time
            <input type="time" defaultValue="15:00" />
          </label>
          <label>
            Remind me
            <select>
              <option>30 minutes before</option>
              <option>10 minutes before</option>
              <option>1 hour before</option>
              <option>No reminder</option>
            </select>
          </label>
          <div className="action-row end">
            <Button variant="secondary">Cancel</Button>
            <Button onClick={onEventSave}>Save to calendar</Button>
          </div>
        </Card>
        <Card className="profile-card">
          <h3>Your knowledge profile</h3>
          {[
            ["Facts", 48, "blue"],
            ["People", 31, "orange"],
            ["Preferences", 17, "purple"],
            ["Events", 12, "green"],
            ["Commitments", 10, "red"],
          ].map(([name, count, color]: any) => (
            <div className="profile-count" key={name}>
              <span className={`profile-bullet ${color}`} />
              <span>{name}</span>
              <strong>{count} confirmed</strong>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
