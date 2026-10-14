import { Check, ShieldCheck } from "lucide-react";
import { Setting } from "../../components/ui";
import { Button, Card, Switch } from "../../components/elements";

export function SettingsPage({
  assistantOn,
  setAssistantOn,
  replyMode,
  setReplyMode,
  allowTypes,
  setAllowTypes,
  learning,
  setLearning,
  personalize,
  setPersonalize,
  onSave,
}: any) {
  const setType = (key: keyof typeof allowTypes, val: boolean) =>
    setAllowTypes((old: any) => ({ ...old, [key]: val }));
  return (
    <>
      <div className="columns settings-columns">
        <div className="stack">
          <Card>
            <div className="setting-main">
              <div>
                <strong>Assistant status</strong>
                <p>Allow CloneBot to process knowledge and draft replies.</p>
              </div>
              <Switch checked={assistantOn} onChange={setAssistantOn} />
            </div>
          </Card>
          <Card>
            <h3>Reply mode</h3>
            <p className="muted">Choose how the assistant handles replies.</p>
            {[
              [
                "Approval mode",
                "CloneBot drafts replies; you approve before they are sent.",
              ],
              [
                "Automatic mode",
                "Drafted replies are sent to trusted contacts automatically.",
              ],
            ].map(([title, desc]) => (
              <button
                key={title}
                className={`mode-option ${replyMode === title ? "selected" : ""}`}
                onClick={() => setReplyMode(title)}
              >
                <ShieldCheck />
                <div>
                  <strong>{title}</strong>
                  <small>{desc}</small>
                </div>
                <span className="radio-dot" />
              </button>
            ))}
            <div className="contact-modes">
              <strong>Automatic mode applies to</strong>
              {["Bilal", "Sana", "Hamza"].map((name, i) => (
                <div key={name}>
                  <span>{name}</span>
                  <Switch
                    checked={i !== 1}
                    onChange={() => {}}
                    label={`Automatic replies for ${name}`}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="stack">
          <Card>
            <h3>Data permissions</h3>
            <p className="muted">
              Choose the source types CloneBot may learn from.
            </p>
            <Setting
              title="Manual notes and typing"
              checked={allowTypes.notes}
              onChange={(v: boolean) => setType("notes", v)}
            />
            <Setting
              title="WhatsApp exports"
              checked={allowTypes.whatsapp}
              onChange={(v: boolean) => setType("whatsapp", v)}
            />
            <Setting
              title="PDF documents"
              checked={allowTypes.pdf}
              onChange={(v: boolean) => setType("pdf", v)}
            />
            <Setting
              title="Word documents (.docx)"
              checked={allowTypes.word}
              onChange={(v: boolean) => setType("word", v)}
            />
          </Card>
          <Card>
            <h3>Learning settings</h3>
            <Setting
              title="Automatic learning"
              description="Instantly extract knowledge from new sources."
              checked={learning}
              onChange={setLearning}
            />
            <Setting
              title="Use knowledge for personalization"
              description="Use approved preferences and facts in drafts."
              checked={personalize}
              onChange={setPersonalize}
            />
          </Card>
        </div>
      </div>
      <div className="action-row end settings-actions">
        <Button
          variant="secondary"
          onClick={() => {
            setAssistantOn(true);
            setReplyMode("Approval mode");
            onSave();
          }}
        >
          Reset
        </Button>
        <Button onClick={onSave}>
          <Check size={16} /> Save settings
        </Button>
      </div>
    </>
  );
}
