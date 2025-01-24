"use client";
import React, { ReactNode } from "react";
import { createChatBotMessage } from "react-chatbot-kit";

interface ActionProviderProps {
  children: ReactNode;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const ActionProvider: React.FC<ActionProviderProps> = ({
  children,
  setState,
}) => {
  const handleMainTopicSelection = (option: number) => {
    let botMessage;

    switch (option) {
      case 1:
        botMessage = createChatBotMessage(
          "A continuación te menciono algunas de las categorías más populares",
          { widget: "categoryOptions" }
        );
        break;
      case 2:
        botMessage = createChatBotMessage(
          `
          ¡Hola! Gracias por tu interés en nuestros productos.
          Al completar tu compra recibirás un correo electrónico con todas las indicaciones: detalles del producto, costo total e información de facturación.
          En este correo de confirmación encontrarás un enlace a nuestra web donde podrás visualizar nuevamente la información de tu pedido
          y adicionalmente un botón con el texto "Coordinar mi envio", este botón te llevará a un chat con nuestros asesores de venta para ultimar los detalles.
          Si necesitas atención personalizada puedes comunicarte a través de nuestro Whatsapp de atención al cliente expuesto en el pie de la pagina
          ¡Cualquier duda, estamos aquí para ayudarte!`,
          {}
        );
        break;
      default:
        botMessage = createChatBotMessage("No entiendo tu opción.", {});
        break;
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleCategorySelection = (option: number) => {
    const botMessage = createChatBotMessage(
      `Excelente elección hemos filtrado nuestros productos basandonos en tu selección,
      A continuación tienes más de nuestras categorías`,
      { widget: "categoryOptions" }
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        // Verifica que child sea un ReactElement antes de clonarlo
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            actions: { handleMainTopicSelection, handleCategorySelection },
          });
        }
        return child;
      })}
    </>
  );
};

export default ActionProvider;
