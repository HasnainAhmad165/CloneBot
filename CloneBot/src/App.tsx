import { useMemo, useState } from "react";
import { Bot, CalendarDays, FileText, LayoutDashboard, LogOut, Menu, Plus, Settings, Shield, X, CheckCircle2 } from "lucide-react";
import { initialEvents, initialFacts, initialReplies, navItems, type NavKey } from "./data/mockData";
import { clearMockStorage, useMockStorage } from "./services/mockStorage";
import type { EventItem, Fact, Reply } from "./utils/types";
import { Brand, Header } from "./components/ui";
import { InviteModal, EventModal, HelpModal } from "./components/ui";
import { AuthScreen } from "./views/AuthScreen/AuthScreen";
import { Dashboard } from "./views/Dashboard/Dashboard";
import { AddKnowledge } from "./views/AddKnowledge/AddKnowledge";
import { KnowledgeReview } from "./views/KnowledgeReview/KnowledgeReview";
import { Assistant } from "./views/Assistant/Assistant";
import { CalendarPage } from "./views/CalendarPage/CalendarPage";
import { PrivacyPage } from "./views/PrivacyPage/PrivacyPage";
import { SettingsPage } from "./views/SettingsPage/SettingsPage";

const icons: Record<NavKey, typeof LayoutDashboard> = {
  Dashboard: LayoutDashboard,
  "Add Knowledge": Plus,
  "Knowledge Review": FileText,
  Assistant: Bot,
  Calendar: CalendarDays,
  Privacy: Shield,
  "Assistant Settings": Settings,
};

export default function App() {
  const [page, setPage] = useState<NavKey>("Dashboard");
  const [signedIn, setSignedIn] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [facts, setFacts] = useMockStorage<Fact[]>("facts", initialFacts);
  const [events, setEvents] = useMockStorage<EventItem[]>(
    "events",
    initialEvents,
  );
  const [replies, setReplies] = useMockStorage<Reply[]>(
    "replies",
    initialReplies,
  );
  const [modal, setModal] = useState<"invite" | "event" | "help" | null>(null);
  const [toast, setToast] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [chatText, setChatText] = useState("");
  const [draftEvent, setDraftEvent] = useState<EventItem | null>(null);
  const [uploadName, setUploadName] = useState("");
  const [assistantOn, setAssistantOn] = useMockStorage("assistantOn", true);
  const [replyMode, setReplyMode] = useMockStorage(
    "replyMode",
    "Approval mode",
  );
  const [learning, setLearning] = useMockStorage("learning", true);
  const [personalize, setPersonalize] = useMockStorage("personalize", true);
  const [allowTypes, setAllowTypes] = useMockStorage("allowTypes", {
    notes: true,
    whatsapp: true,
    pdf: false,
    word: true,
  });
  const [keepFiles, setKeepFiles] = useMockStorage("keepFiles", false);
  const [keepSigned, setKeepSigned] = useState(true);
  const filteredFacts = useMemo(
    () =>
      activeFilter === "All"
        ? facts
        : facts.filter((f) => f.type === activeFilter),
    [facts, activeFilter],
  );

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };
  const openEvent = (event?: EventItem) => {
    setDraftEvent(
      event ?? {
        id: Date.now(),
        title: "",
        date: "2026-10-09",
        time: "3:00 PM",
        color: "purple",
        reminder: "30 minutes before",
      },
    );
    setModal("event");
  };
  const removeFact = (id: number) =>
    setFacts((items) => items.filter((item) => item.id !== id));
  const approveFact = (id: number) => {
    const fact = facts.find((item) => item.id === id);
    removeFact(id);
    notify(`${fact?.type ?? "Item"} approved and saved`);
  };
  const sendReply = (id: number) => {
    setReplies((items) => items.filter((item) => item.id !== id));
    notify("Reply approved and sent");
  };
  const saveEvent = () => {
    if (!draftEvent?.title.trim()) return notify("Add an event title first");
    setEvents((items) => [
      draftEvent,
      ...items.filter((item) => item.id !== draftEvent.id),
    ]);
    setModal(null);
    notify("Event saved to your calendar");
  };

  if (!signedIn)
    return (
      <AuthScreen
        mode={authMode}
        setMode={setAuthMode}
        onSubmit={() => {
          setSignedIn(true);
          setPage("Dashboard");
        }}
        keepSigned={keepSigned}
        setKeepSigned={setKeepSigned}
      />
    );

  const titleMap: Record<NavKey, string> = {
    Dashboard: "Good evening, Jawad",
    "Add Knowledge": "Add knowledge",
    "Knowledge Review": "Knowledge review",
    Assistant: "Assistant",
    Calendar: "Calendar and reminders",
    Privacy: "Privacy and data control",
    "Assistant Settings": "Assistant settings",
  };
  const subMap: Record<NavKey, string> = {
    Dashboard: "Monday, October 9, 2026",
    "Add Knowledge":
      "Feed your assistant context and facts to personalize its reply suggestions.",
    "Knowledge Review":
      "Verify and approve facts extracted from your latest knowledge uploads.",
    Assistant: "Review conversations and decide how your assistant responds.",
    Calendar: "Confirmed events from your chats, documents and notes.",
    Privacy: "You own your data. Decide what is processed, kept and learned.",
    "Assistant Settings":
      "Decide how your assistant behaves and uses data for you.",
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <Brand />
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>
        </div>
        <nav>
          {navItems.map((item) => {
            const Icon = icons[item];
            return (
              <button
                key={item}
                className={`nav-item ${page === item ? "active" : ""}`}
                onClick={() => {
                  setPage(item);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={19} />
                <span>{item}</span>
                {item === "Assistant" && replies.length > 0 && (
                  <b className="nav-count">{replies.length}</b>
                )}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-profile">
          <div className="profile-pic">J</div>
          <div>
            <strong>Jawad Tariq</strong>
            <small>Personal workspace</small>
          </div>
          <button
            className="icon-button"
            title="Sign out"
            onClick={() => setSignedIn(false)}
          >
            <LogOut size={17} />
          </button>
        </div>
      </aside>
      {sidebarOpen && (
        <button
          className="sidebar-scrim"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <main className="main-area">
        <Header
          title={titleMap[page]}
          subtitle={subMap[page]}
          onHelp={() => setModal("help")}
        />
        <button className="mobile-menu" onClick={() => setSidebarOpen(true)}>
          <Menu />
        </button>
        <div className="page-content">
          {page === "Dashboard" && (
            <Dashboard
              facts={facts}
              events={events}
              replies={replies}
              assistantOn={assistantOn}
              setPage={setPage}
              onInvite={() => setModal("invite")}
            />
          )}{" "}
          {page === "Add Knowledge" && (
            <AddKnowledge
              uploadName={uploadName}
              setUploadName={setUploadName}
              keepFiles={keepFiles}
              setKeepFiles={setKeepFiles}
              onProcess={(text) => {
                if (!text) return notify("Choose a file or add a note first");
                setFacts((items) => [
                  {
                    id: Date.now(),
                    type: "Fact",
                    text: `Added from ${text}`,
                    source: "New upload · just now",
                  },
                  ...items,
                ]);
                setUploadName("");
                notify("Information added to your review queue");
              }}
            />
          )}{" "}
          {page === "Knowledge Review" && (
            <KnowledgeReview
              facts={filteredFacts}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              onApprove={approveFact}
              onEdit={(f) => {
                setDraftEvent({
                  id: f.id,
                  title: f.text,
                  date: "2026-10-09",
                  time: "3:00 PM",
                  color: "purple",
                  reminder: "30 minutes before",
                });
                setModal("event");
              }}
              onDismiss={removeFact}
              onEventSave={() => openEvent()}
            />
          )}{" "}
          {page === "Assistant" && (
            <Assistant
              replies={replies}
              onSend={sendReply}
              onDismiss={(id) => {
                setReplies((items) => items.filter((item) => item.id !== id));
                notify("Draft dismissed");
              }}
              onInvite={() => setModal("invite")}
              chatText={chatText}
              setChatText={setChatText}
              onSuggest={() => {
                if (!chatText.trim()) return;
                setReplies((items) => [
                  {
                    id: Date.now(),
                    name: "New conversation",
                    message: chatText,
                    draft: "I’ll review this and get back to you soon.",
                    mode: replyMode.startsWith("Approval")
                      ? "Approval"
                      : "Automatic",
                  },
                  ...items,
                ]);
                setChatText("");
                notify("Reply draft created");
              }}
            />
          )}{" "}
          {page === "Calendar" && (
            <CalendarPage
              events={events}
              onNew={() => openEvent()}
              onEdit={openEvent}
              onDelete={(id) => {
                setEvents((items) => items.filter((item) => item.id !== id));
                notify("Event removed");
              }}
            />
          )}{" "}
          {page === "Privacy" && (
            <PrivacyPage
              keepFiles={keepFiles}
              setKeepFiles={setKeepFiles}
              learning={learning}
              setLearning={setLearning}
              personalize={personalize}
              setPersonalize={setPersonalize}
              factsCount={127}
              onDelete={(what) => notify(`${what} deleted from this demo`)}
            />
          )}{" "}
          {page === "Assistant Settings" && (
            <SettingsPage
              assistantOn={assistantOn}
              setAssistantOn={setAssistantOn}
              replyMode={replyMode}
              setReplyMode={setReplyMode}
              allowTypes={allowTypes}
              setAllowTypes={setAllowTypes}
              learning={learning}
              setLearning={setLearning}
              personalize={personalize}
              setPersonalize={setPersonalize}
              onSave={() => notify("Settings saved")}
            />
          )}
        </div>
      </main>
      {modal === "invite" && (
        <InviteModal
          onClose={() => setModal(null)}
          onSubmit={() => {
            setModal(null);
            notify("Invitation prepared in this demo");
          }}
        />
      )}{" "}
      {modal === "event" && draftEvent && (
        <EventModal
          event={draftEvent}
          setEvent={setDraftEvent}
          onClose={() => setModal(null)}
          onSave={saveEvent}
        />
      )}{" "}
      {modal === "help" && (
        <HelpModal
          onClose={() => setModal(null)}
          onReset={() => {
            clearMockStorage();
            window.location.reload();
          }}
        />
      )}{" "}
      {toast && (
        <div className="toast">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}
    </div>
  );
}
