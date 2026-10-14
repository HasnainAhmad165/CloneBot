
export function Switch({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`switch ${checked ? "on" : ""}`}
      role="switch"
      aria-checked={checked}
      aria-label={label ?? "Toggle setting"}
      onClick={() => onChange(!checked)}
      disabled={disabled}
    >
      <span />
    </button>
  );
}
