"use client";

import { useState, ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Home, 
  BookOpen, 
  Target, 
  Calendar, 
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: ReactNode;
  userName?: string;
  userAvatar?: string;
  userInitial?: string;
}

export function AppLayout({ children, userName = "Clarisse Kovalenko", userAvatar, userInitial = "M" }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { icon: Search, label: "Rechercher" },
    { icon: Home, label: "Accueil", href: "/app" },
    { icon: BookOpen, label: "Formations", href: "/app/formations" },
    { icon: Target, label: "Objectifs" },
    { icon: Calendar, label: "Calendrier" },
    { icon: FileText, label: "Documents" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        title="Fakto"
        navItems={navItems}
      />
      
      <div className={cn("transition-all duration-300", sidebarOpen ? "ml-64" : "ml-16")}>
        <TopBar
          userName={userName}
          userAvatar={userAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Clarisse"}
          additionalActions={
            <Button variant="ghost" size="icon">
              <div className="w-5 h-5 rounded-full bg-purple-500"></div>
            </Button>
          }
        />
        
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
