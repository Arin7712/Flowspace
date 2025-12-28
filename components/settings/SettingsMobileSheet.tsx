import {
    Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import SettingsContainer from "./SettingsContainer";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preferredName: string | null,
  email: string
};

const SettingsMobileSheet = ({open, onOpenChange, email, preferredName }: Props) => {

  const user = {email, preferredName};

  return (
    <div>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger>Settings</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
          
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>

          </SheetHeader>

          <SettingsContainer user={user}/>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SettingsMobileSheet;
