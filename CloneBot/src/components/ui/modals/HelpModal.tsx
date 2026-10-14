import { CircleHelp, X } from "lucide-react";
import { Button } from "../../elements/Button/Button";

export function HelpModal({
  onClose,
  onReset,
}: {
  onClose: () => void;
  onReset: () => void;
}) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal help-modal">
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>
        <div className="modal-icon">
          <CircleHelp />
        </div>
        <h2>CloneBot help</h2>
        <p>
          Your demo data is saved in this browser on this device, so it is still
          here if you refresh the page. It is not sent to a server or shared
          with teammates. Sign-in, uploads, invitations and reminders are still
          demos.
        </p>
        <div className="storage-actions">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="danger" onClick={onReset}>
            Reset demo data
          </Button>
        </div>
      </div>
    </div>
  );
}
