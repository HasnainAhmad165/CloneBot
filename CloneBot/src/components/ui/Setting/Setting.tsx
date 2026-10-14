import { Switch } from "../../elements/Switch/Switch";

export function Setting({
  title,
  description,
  checked,
  onChange,
  disabled = false,
}: {
  title: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="setting-row">
      <div>
        <strong>{title}</strong>
        {description && <small>{description}</small>}
      </div>
      <Switch
        checked={checked}
        onChange={onChange}
        label={title}
        disabled={disabled}
      />
    </div>
  );
}
