import { Check, Plus, Search, Send, Shield, ShieldCheck, Sparkles, X } from "lucide-react";
import { Button, Card } from "../../components/elements";
import type { Reply } from "../../utils/types";
import { useState } from "react";

export function Assistant({
  replies,
  onSend,
  onDismiss,
  onInvite,
  chatText,
  setChatText,
  onSuggest,
}: {
  replies: Reply[];
  onSend: (id: number) => void;
  onDismiss: (id: number) => void;
  onInvite: () => void;
  chatText: string;
  setChatText: (s: string) => void;
  onSuggest: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(
    replies[0]?.id ?? null,
  );
  const current = replies.find((r) => r.id === selected) ?? replies[0];
  return (
    <div className="assistant-layout">
      <Card className="conversation-list">
        <div className="card-heading">
          <div>
            <h3>Conversations</h3>
            <p>Private to your workspace</p>
          </div>
          <Button onClick={onInvite}>
            <Plus size={16} /> Invite
          </Button>
        </div>
        <label className="search-box">
          <Search size={16} />
          <input placeholder="Find a conversation" />
        </label>
        {replies.map((r) => (
          <button
            key={r.id}
            className={`conversation-item ${current?.id === r.id ? "selected" : ""}`}
            onClick={() => setSelected(r.id)}
          >
            <div className="person-avatar">{r.name.charAt(0)}</div>
            <div>
              <strong>{r.name}</strong>
              <small>{r.message}</small>
            </div>
            <span className="unread-dot" />
          </button>
        ))}
        {!replies.length && (
          <div className="empty-state small-empty">No pending drafts</div>
        )}
      </Card>
      <div className="chat-column">
        <Card className="chat-card">
          <div className="chat-head">
            <div className="person-avatar">
              {current?.name.charAt(0) ?? "?"}
            </div>
            <div>
              <strong>{current?.name ?? "Choose a conversation"}</strong>
              <small>Private conversation</small>
            </div>
            <span className="mode-pill">
              <ShieldCheck size={14} />
              {current?.mode === "Automatic"
                ? "Automatic mode"
                : "Approval mode"}
            </span>
          </div>
          <div className="chat-messages">
            <div className="message received">
              <small>{current?.name ?? "Contact"}</small>
              <p>{current?.message ?? "No messages here yet."}</p>
              <time>Today, 10:32 AM</time>
            </div>
            <div className="message draft">
              <span className="draft-label">
                <Sparkles size={14} /> CloneBot draft · needs your approval
              </span>
              <p>
                {current?.draft ??
                  "Draft replies will appear here for your review."}
              </p>
              <time>Suggested using your approved knowledge</time>
            </div>
          </div>
          <div className="chat-compose">
            <input
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              placeholder="Write a message or ask for a draft…"
              onKeyDown={(e) => e.key === "Enter" && onSuggest()}
            />
            <button onClick={onSuggest} aria-label="Create reply draft">
              <Send size={18} />
            </button>
          </div>
        </Card>
        <div className="draft-actions">
          <span>
            <Shield size={16} /> You always control what gets sent.
          </span>
          <div>
            <Button
              variant="secondary"
              onClick={() => current && onDismiss(current.id)}
            >
              <X size={16} /> Dismiss
            </Button>
            <Button onClick={() => current && onSend(current.id)}>
              <Check size={16} /> Approve and send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
