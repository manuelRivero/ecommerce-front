"use client";
import React, { useState } from "react";

import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import { Box, IconButton } from "@mui/material";
import { keyframes } from "@mui/system";


const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;
const pulseBackground = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 150, 255, 0.6); }
  50% { box-shadow: 0 0 15px 10px rgba(0, 150, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 150, 255, 0); }
`;
export default function ChatBotComponent() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      {open ? (
        <>
          <Chatbot
            config={config(setOpen)}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            floating={true}
            headerText="Chatbot"
          />
        </>
      ) : (
        <Box sx={{ padding: 4 }}>
          <IconButton
            sx={{
              animation: `${bounce} 1.5s infinite ease-in-out, ${pulseBackground} 2s infinite ease-out`,
              transition: "transform 0.3s ease",
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
            onClick={() => setOpen(true)}
          >
            <MarkChatUnreadIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
}
