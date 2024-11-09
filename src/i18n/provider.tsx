import React, { Fragment, ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./locales";
import messages from "./messages";

// Define a type for the messages object
interface Messages {
  [key: string]: Record<string, string>;
}

interface ProviderProps {
  children: ReactNode;
  locale?: string;
}

// Ensure messages is of type Messages
const typedMessages: Messages = messages;

const Provider: React.FC<ProviderProps> = ({ children, locale = LOCALES.ENGLISH }) => {
  return (
    <IntlProvider
      locale={locale}
      textComponent={Fragment}
      messages={typedMessages[locale]}
    >
      {children}
    </IntlProvider>
  );
};

export default Provider;
