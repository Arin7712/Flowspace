import { SettingsSection } from "./SettingsContainer";

type Props = {
  activeSection: SettingsSection;
  onChange: (section: SettingsSection) => void;
};

export const SettingsSidebar = ({ activeSection, onChange }: Props) => {
  return (
    <nav className="flex flex-col gap-1">
      <button
        onClick={() => onChange("user")}
        className={activeSection === "user" ? "bg-muted" : ""}
      >
        User
      </button>

      <button
        onClick={() => onChange("workspace")}
        className={activeSection === "workspace" ? "bg-muted" : ""}
      >
        Workspace
      </button>
    </nav>
  );
};
