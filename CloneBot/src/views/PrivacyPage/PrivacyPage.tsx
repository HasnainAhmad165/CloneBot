import { ShieldCheck } from "lucide-react";
import { Setting } from "../../components/ui";
import { Button, Card } from "../../components/elements";

export function PrivacyPage({
  keepFiles,
  setKeepFiles,
  learning,
  setLearning,
  personalize,
  setPersonalize,
  factsCount,
  onDelete,
}: {
  keepFiles: boolean;
  setKeepFiles: (v: boolean) => void;
  learning: boolean;
  setLearning: (v: boolean) => void;
  personalize: boolean;
  setPersonalize: (v: boolean) => void;
  factsCount: number;
  onDelete: (what: string) => void;
}) {
  return (
    <div className="columns privacy-columns">
      <div className="stack">
        <div className="privacy-note large">
          <ShieldCheck />
          <div>
            <strong>Your data is private</strong>
            <p>
              You choose which information CloneBot processes, keeps and learns
              from. Privacy controls shown here are demo settings.
            </p>
          </div>
        </div>
        <Card>
          <h3>What CloneBot may do</h3>
          <Setting
            title="Process selected content"
            description="Allow new knowledge sources to be reviewed."
            checked={true}
            onChange={() => {}}
            disabled
          />
          <Setting
            title="Store approved knowledge"
            description="Keep confirmed facts in your knowledge profile."
            checked={true}
            onChange={() => {}}
          />
          <Setting
            title="Personalize replies"
            description="Use approved knowledge in draft suggestions."
            checked={personalize}
            onChange={setPersonalize}
          />
          <Setting
            title="Keep original files"
            description="Retain uploaded source files after processing."
            checked={keepFiles}
            onChange={setKeepFiles}
          />
          <Setting
            title="Automatic learning"
            description="Add new facts without the review queue."
            checked={learning}
            onChange={setLearning}
          />
          <Setting
            title="Save interaction history"
            description="Keep previous draft decisions for your reference."
            checked={true}
            onChange={() => {}}
            disabled
          />
        </Card>
      </div>
      <div className="stack">
        <Card className="storage-card">
          <h3>Knowledge profile</h3>
          <div className="storage-chart">
            <div className="donut">
              <strong>{factsCount}</strong>
              <small>items</small>
            </div>
            <div className="storage-legend">
              {[
                ["Facts", 48, "purple"],
                ["People", 31, "blue"],
                ["Preferences", 17, "orange"],
                ["Events", 12, "green"],
                ["Commitments", 10, "gray"],
              ].map(([label, n, c]: any) => (
                <div key={label}>
                  <i className={`profile-bullet ${c}`} />
                  <span>{label}</span>
                  <strong>{n}</strong>
                </div>
              ))}
            </div>
          </div>
          <p className="muted note-divider">
            Original files are removed after processing unless you choose to
            keep them.
          </p>
        </Card>
        <Card className="delete-card">
          <h3>Delete data</h3>
          <p>Remove saved information from this demo.</p>
          {[
            ["Delete interaction history", "History"],
            ["Delete entire knowledge profile", "Knowledge profile"],
            ["Delete my account and all data", "Account"],
          ].map(([label, key]) => (
            <div className="delete-row" key={key}>
              <span>{label}</span>
              <Button variant="danger" onClick={() => onDelete(key)}>
                {key === "Account" ? "Delete account" : "Delete"}
              </Button>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
