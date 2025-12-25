import { SettingsSection } from "./SettingsContainer";


type Props = {
  activeSection: SettingsSection;
};

type DBUser = {
  preferredName: string | null,
  email: string
}


const SettingsContent = ({ activeSection, user }: {activeSection: SettingsSection, user: DBUser}) => {
  switch (activeSection) {
    case "user":
      return <>User: {user.preferredName}</>;
    case "workspace":
      return <>Workspace</>;
    default:
      return null;
  }
};

export default SettingsContent;
