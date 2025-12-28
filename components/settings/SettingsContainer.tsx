"use client";

import { useState } from "react";
import SettingsContent from "./SettingsContent";
import { SettingsSidebar } from "./SettingsSidebar";

export type SettingsSection =
  | "user"
  | "workspace"
  | "preferences"
  | "account";

  type DBUser = {
  preferredName: string | null,
  email: string,
  id: string
}

const SettingsContainer = ({user}: {user: DBUser}) => {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("user");

  return (
    <main className="flex h-full">
      {/* Sidebar */}
      <div className="w-[30%]">
        <SettingsSidebar
          activeSection={activeSection}
          onChange={setActiveSection}
        />
      </div>

      {/* Content */}
      <div className="w-[70%]">
        <SettingsContent activeSection={activeSection} user={user}/>
      </div>
    </main>
  );
};

export default SettingsContainer;
