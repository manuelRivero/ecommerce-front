import { useITheme } from "@/components/themeProvider";
import { Avatar } from "@mui/material";
import React from "react";
import TenantLogo from "@/components/shared/TenantLogo";

export default function AvatarBot() {
  const { state } = useITheme();
  
  // Si no hay logo, usar el componente TenantLogo con fallback
  if (!state.config?.metadata?.logo) {
    return (
      <TenantLogo 
        width={40} 
        height={40}
        borderRadius="50%"
        alt="Bot Avatar"
      />
    );
  }
  
  return <Avatar src={state.config.metadata.logo} />;
}
