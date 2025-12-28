"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SignOutButton } from "@clerk/nextjs";
import { SettingsDialog } from "./settings/SettingsDialog";
import SettingsMobileSheet from "./settings/SettingsMobileSheet";
import { useState } from "react";

type DBUser = {
  preferredName: string | null;
  email: string;
};

export function NavUser({
  workspace,
  user,
}: {
  workspace: {
    name: string;
    id: string;
  };
  user: DBUser;
}) {
  const { isMobile } = useSidebar();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-md">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarFallback className="rounded-md text-lg">
                  {workspace.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{workspace.name}</span>
                {/* <span className="truncate text-xs">{workspace.id}</span> */}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded-lg">
                    {workspace.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{workspace.name}</span>
                  {/* <span className="truncate text-xs">{workspace.id}</span> */}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* Settings Button - Dialog*/}
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault(); // keep dropdown stable
                }}
                className="md:block hidden"
              >
                <div className="flex items-center gap-2">
                  <Settings />
                  <SettingsDialog user={user} />
                </div>
              </DropdownMenuItem>

              {/* Settings Button - Sheet (Mobile View)} */}
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault(); // keep dropdown stable
                  setSettingsOpen(true);
                }}
                className="md:hidden block"
              >
                <div className="flex items-center gap-2">
                  <Settings />
                  <SettingsMobileSheet
                    open={settingsOpen}
                    onOpenChange={setSettingsOpen}
                    email={user.email}
                    preferredName={user.preferredName}
                  />
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SignOutButton>
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
