"use client";
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./components/Options";
import ActionProvider from "./ActionProvider";
import CategoriesOptions from "./components/CategoriesOptions";
import AvatarBot from "./components/Avatar";
import { Box, IconButton, Stack } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

const config = {
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
    userMessageBox: {
      display: "none", // Ocultamos el input del usuario
    },
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props: { actionProvider: any }) => <Options {...props} />,
      props: {
        options: [
          { text: "Deseo comprar", id: 1 },
          { text: "Deseo coordinar mi envío", id: 2 },
        ],
      },
    },
    {
      widgetName: "categoryOptions",
      widgetFunc: (props: { actionProvider: any }) => (
        <CategoriesOptions {...props} />
      ),
    },
  ],
};

const getMessages = () => {
  if (typeof window !== "undefined") {
    return [
      createChatBotMessage(
        "Hola, bienvenido a nuestra tienda ¡en qué puedo ayudarte?",
        {
          widget: "options",
        }
      ),
    ];
  }
  return [];
};

const configWithMessages = (setOpen: (open: boolean) => void) => ({
  ...config,
  customComponents: {
    header: () => (
      <Stack>
        <Box sx={{ padding: 1 }}>
          <IconButton onClick={() => setOpen(false)}>
            <ClearIcon />
          </IconButton>
        </Box>
      </Stack>
    ),
    // Replaces the default bot avatar
    botAvatar: () => <AvatarBot />,
  },
  initialMessages: getMessages(),
  actionProvider: ActionProvider,
});

export default configWithMessages;
