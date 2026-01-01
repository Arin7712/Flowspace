"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import UserSettingsForm from "../forms/UserSettingsForm";
import { SettingsSection } from "./SettingsContainer";

type DBUser = {
  preferredName: string | null;
  email: string;
  id: string;
};

const SettingsContent = ({
  activeSection,
  user,
}: {
  activeSection: SettingsSection;
  user: DBUser;
}) => {


  switch (activeSection) {
    case "user":
      return (
        <div>
          User: {user.preferredName}
          <UserSettingsForm
            preferredName={user.preferredName}
            userId={user.id}
          />
        </div>
      );
    default:
      return null;
  }
};

export default SettingsContent;
