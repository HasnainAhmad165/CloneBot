import { Send, Users, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../elements/Button/Button";

export function InviteModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [mode, setMode] = useState("Suggest replies");
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        className="modal invite-modal"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <button className="modal-close" type="button" onClick={onClose}>
          <X />
        </button>
        <div className="modal-icon aqua">
          <Users />
        </div>
        <h2>Invite someone to chat</h2>
        <p>They will only see their conversation with you.</p>
        <label>
          Their name
          <input placeholder="Name" required />
        </label>
        <label>
          Email address
          <input type="email" placeholder="name@example.com" required />
        </label>
        <span className="field-title">Your assistant in this conversation</span>
        <div className="mode-cards">
          {[
            ["Suggest replies", "I approve each one before sending."],
            ["Reply automatically", "Needs confirmation for custom rules."],
          ].map(([name, desc]) => (
            <button
              type="button"
              className={`mode-card ${mode === name ? "selected" : ""}`}
              key={name}
              onClick={() => setMode(name)}
            >
              <strong>{name}</strong>
              <small>{desc}</small>
              <span className="radio-dot" />
            </button>
          ))}
        </div>
        <label className="check-label">
          <input type="checkbox" defaultChecked />
          Private invitation link for this conversation only
        </label>
        <div className="action-row end">
          <Button variant="quiet" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            <Send size={16} /> Send invitation
          </Button>
        </div>
        <small className="demo-disclaimer">
          Demo only: invitations are not sent yet.
        </small>
      </form>
    </div>
  );
}
