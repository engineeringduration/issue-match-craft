
import React from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
