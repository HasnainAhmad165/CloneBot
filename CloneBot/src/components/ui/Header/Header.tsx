import { CircleHelp, Search } from "lucide-react";

export function Header({
  title,
  subtitle,
  onHelp,
}: {
  title: string;
  subtitle: string;
  onHelp: () => void;
}) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="header-tools">
        <label className="global-search">
          <Search size={17} />
          <input placeholder="Search knowledge or replies…" />
          <kbd>⌘ K</kbd>
        </label>
        <button className="help-button" onClick={onHelp} aria-label="Help">
          <CircleHelp size={18} />
        </button>
        <button className="avatar">J</button>
      </div>
    </header>
  );
}
