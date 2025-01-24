import React from "react";

interface MessageParserProps {
  children: React.ReactNode;
  actions: {
    handleMainTopicSelection: (option: string | number) => void;
  };
}

const MessageParser: React.FC<MessageParserProps> = ({ children, actions }) => {
  const parse = (message: string) => {
    console.log("Mensaje recibido:", message);
    // Puedes agregar lógica aquí para detectar palabras clave y llamar a `actions`
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            parse,
            actions, // Ahora pasamos `actions` correctamente
          });
        }
        return child;
      })}
    </>
  );
};

export default MessageParser;
