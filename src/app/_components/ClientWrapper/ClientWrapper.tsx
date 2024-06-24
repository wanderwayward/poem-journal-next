"use client";

import React from "react";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  // The component ensures that the wrapped children are only rendered on the client side.
  return <>{children}</>;
};

export default ClientWrapper;
