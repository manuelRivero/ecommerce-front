import { useITheme } from "@/components/themeProvider";
import { Avatar } from "@mui/material";
import React from "react";

export default function AvatarBot() {
  const { state } = useITheme();
  return <Avatar src={state.config.metadata.logo} />;
}
