
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SettingsContainer from "./SettingsContainer";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

type DBUser = {
  preferredName: string | null,
  email: string,
  id: string
}

export function SettingsDialog({user}: {user: DBUser}) {


  return (
    <Dialog>
        <DialogTrigger>Settings</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:min-w-[60%] md:min-h-[60vh] bg-sidebar">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
        {/* Settings Component*/}
        <SettingsContainer user={user}/>
          {/* <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
    </Dialog>
  );
}
