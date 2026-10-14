import { Bot } from "lucide-react";

export function Brand({ small = false }: { small?: boolean }) {
  return (
    <div className="brand">
      <span className="brand-mark">
        <Bot size={21} />
      </span>
      <span>CloneBot</span>
      {!small && <span className="version">v1.0</span>}
    </div>
  );
}
