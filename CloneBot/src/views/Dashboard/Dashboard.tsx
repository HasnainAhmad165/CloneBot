import { ArrowRight, CalendarDays, FileText, MessageSquare, MoreHorizontal, Plus, Shield, Users, BookOpen } from "lucide-react";
import { Button, Card } from "../../components/elements";
import type { EventItem, Fact, Reply } from "../../utils/types";
import type { NavKey } from "../../data/mockData";

export function Dashboard({
  facts,
  events,
  replies,
  assistantOn,
  setPage,
  onInvite,
}: {
  facts: Fact[];
  events: EventItem[];
  replies: Reply[];
  assistantOn: boolean;
  setPage: (p: NavKey) => void;
  onInvite: () => void;
}) {
  return (
    <>
      <div className="status-banner">
        <span className={`status-dot ${assistantOn ? "" : "off"}`} />
        <div>
          <strong>Assistant is {assistantOn ? "active" : "paused"}</strong>
          <p>
            {assistantOn
              ? "Operating in human-approval drafting mode."
              : "It will not process new knowledge or draft replies."}
          </p>
        </div>
        <div className="banner-actions">
          <span className="pill blue-pill">
            {replies.length} pending replies
          </span>
          <Button onClick={() => setPage("Assistant")}>Review replies</Button>
        </div>
      </div>
      <div className="stats-grid">
        {[
          [BookOpen, "Knowledge items", "127", "+14 this week", "green"],
          [
            MessageSquare,
            "Pending replies",
            String(replies.length),
            "Review drafts",
            "",
          ],
          [
            CalendarDays,
            "Upcoming events",
            String(events.length),
            "View calendar",
            "green",
          ],
          [
            FileText,
            "Items to review",
            String(facts.length),
            "From recent uploads",
            "orange",
          ],
        ].map(([Icon, label, value, foot, tone]: any) => (
          <Card className="stat-card" key={label}>
            <div className="stat-label">
              <Icon size={16} />
              {label}
            </div>
            <strong className="stat-value">{value}</strong>
            <small className={tone}>{foot}</small>
          </Card>
        ))}
      </div>
      <div className="dashboard-grid">
        <Card className="commitments">
          <div className="card-heading">
            <div>
              <h3>Upcoming commitments</h3>
              <p>Things your assistant is keeping track of</p>
            </div>
            <button className="text-button" onClick={() => setPage("Calendar")}>
              View calendar <ArrowRight size={15} />
            </button>
          </div>
          {events.slice(0, 3).map((e) => (
            <div className="commitment-row" key={e.id}>
              <span className={`event-dot ${e.color}`} />
              <CalendarDays size={17} />
              <strong>{e.title}</strong>
              <small>
                {new Date(`${e.date}T12:00:00`).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                · {e.time}
              </small>
              <span className="pill green-pill">Confirmed</span>
            </div>
          ))}
        </Card>
        <Card className="recent">
          <div className="card-heading">
            <div>
              <h3>Recent activity</h3>
              <p>Latest updates to your assistant</p>
            </div>
            <MoreHorizontal size={19} />
          </div>
          {[
            "Learned a preference from your recent notes",
            "Created a reply draft for Bilal",
            "Added a new knowledge source",
            "Detected an event in a chat",
          ].map((t, i) => (
            <div className="activity-row" key={t}>
              <span className="activity-dot" />
              <div>
                <p>{t}</p>
                <small>
                  {
                    [
                      "20 minutes ago",
                      "1 hour ago",
                      "3 hours ago",
                      "Yesterday",
                    ][i]
                  }
                </small>
              </div>
            </div>
          ))}
        </Card>
      </div>
      <div className="quick-actions">
        <Button onClick={() => setPage("Add Knowledge")}>
          <Plus size={17} /> Add knowledge
        </Button>
        <Button variant="secondary" onClick={() => setPage("Privacy")}>
          <Shield size={17} /> Privacy controls
        </Button>
        <Button variant="secondary" onClick={onInvite}>
          <Users size={17} /> Invite someone
        </Button>
      </div>
    </>
  );
}
