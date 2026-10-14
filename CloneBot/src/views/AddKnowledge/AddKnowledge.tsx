import { ArrowRight, FileText, MessageSquare, Paperclip, ShieldCheck, Sparkles, Upload, Pencil } from "lucide-react";
import { Button, Card, Switch } from "../../components/elements";
import { useState } from "react";

export function AddKnowledge({
  uploadName,
  setUploadName,
  keepFiles,
  setKeepFiles,
  onProcess,
}: {
  uploadName: string;
  setUploadName: (s: string) => void;
  keepFiles: boolean;
  setKeepFiles: (v: boolean) => void;
  onProcess: (s: string) => void;
}) {
  const [source, setSource] = useState("WhatsApp chat");
  const [typed, setTyped] = useState("");
  return (
    <div className="columns knowledge-columns">
      <div className="stack">
        <div className="source-tabs">
          {[
            ["Type it in", Pencil],
            ["WhatsApp chat", MessageSquare],
            ["PDF file", FileText],
            ["Word document", FileText],
          ].map(([name, Icon]: any) => (
            <button
              key={name}
              className={source === name ? "chosen" : ""}
              onClick={() => setSource(name)}
            >
              <span>
                <Icon size={19} />
              </span>
              {name}
            </button>
          ))}
        </div>
        {source === "Type it in" ? (
          <Card className="typed-card">
            <h3>Add a note</h3>
            <p>
              Type a preference, fact or commitment for your assistant to
              remember.
            </p>
            <textarea
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder="For example: I prefer short emails and avoid meetings on Friday afternoons."
              rows={9}
            />
            <div className="form-row">
              <label>
                Category
                <select>
                  <option>Fact</option>
                  <option>Preference</option>
                  <option>Commitment</option>
                  <option>Person</option>
                </select>
              </label>
            </div>
          </Card>
        ) : (
          <label className="dropzone">
            <input
              type="file"
              accept={
                source === "PDF file"
                  ? ".pdf"
                  : source === "Word document"
                    ? ".doc,.docx"
                    : ".txt,.zip,.json"
              }
              onChange={(e) => setUploadName(e.target.files?.[0]?.name ?? "")}
            />
            <span className="upload-icon">
              <Upload size={24} />
            </span>
            <strong>
              {uploadName ||
                `Drop your ${source === "WhatsApp chat" ? "WhatsApp export" : source === "PDF file" ? "PDF file" : "Word document"} here`}
            </strong>
            <small>
              Supports .txt or .zip files. Or <u>browse files</u>
            </small>
            <span className="file-limit">Maximum file size: 50 MB</span>
            {uploadName && (
              <span className="selected-file">
                <Paperclip size={15} />
                {uploadName}
              </span>
            )}
          </label>
        )}
        <Card>
          <h3>
            Before we process this {source === "Type it in" ? "note" : "file"}:
          </h3>
          <label className="setting-row">
            <span>
              Extract facts, people mentioned, preferences and upcoming events
            </span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="setting-row">
            <span>
              Make approved items available to personalize drafted replies
            </span>
            <input type="checkbox" defaultChecked />
          </label>
          <div className="setting-row">
            <span>Keep the original file after processing</span>
            <Switch checked={keepFiles} onChange={setKeepFiles} />
          </div>
        </Card>
        <div className="action-row">
          <Button
            onClick={() =>
              onProcess(source === "Type it in" ? typed.trim() : uploadName)
            }
          >
            <Sparkles size={17} /> Process information
          </Button>
          <Button
            variant="quiet"
            onClick={() => {
              setUploadName("");
              setTyped("");
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="stack">
        <Card>
          <div className="card-heading">
            <div>
              <h3>Processing queue</h3>
              <p>Recent knowledge sources</p>
            </div>
            <span className="pill">3 items</span>
          </div>
          {[
            ["Chat_Sana_Oct2026.zip", "1.4 MB", "Processing · 65%", "progress"],
            [
              "Project_Proposal.pdf",
              "4.2 MB",
              "Added to review queue",
              "success",
            ],
            [
              "Draft_Agreement_V2.docx",
              "310 KB",
              "Could not read this file",
              "error",
            ],
          ].map(([file, size, status, tone]: any) => (
            <div className="queue-item" key={file}>
              <div className="queue-top">
                <FileText size={17} />
                <strong>{file}</strong>
                <small>{size}</small>
              </div>
              <p className={tone}>{status}</p>
              {tone === "progress" && (
                <div className="progress">
                  <i />
                </div>
              )}
            </div>
          ))}
        </Card>
        <div className="privacy-note">
          <ShieldCheck />
          <div>
            <strong>You stay in control</strong>
            <p>
              Only information you choose to process is added. Review extracted
              items before they become part of your assistant's knowledge.
            </p>
          </div>
        </div>
        <Card className="tip-card">
          <h3>What can I add?</h3>
          <p>
            Manual notes and chat exports help your assistant learn your
            preferences, important people, events and commitments.
          </p>
          <button className="text-button">
            View supported formats <ArrowRight size={15} />
          </button>
        </Card>
      </div>
    </div>
  );
}
