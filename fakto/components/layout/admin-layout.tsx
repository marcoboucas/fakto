"use client";

import { useState, ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Home, 
  Users, 
  BookOpen, 
  Settings,
  BarChart3,
  FileText
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  userName?: string;
  userAvatar?: string;
  userInitial?: string;
}

export function AdminLayout({ children, userName = "Administrateur", userAvatar, userInitial = "A" }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { icon: Search, label: "Rechercher" },
    { icon: Home, label: "Accueil", href: "/admin" },
    { icon: Users, label: "Utilisateurs" },
    { icon: BookOpen, label: "Formations", href: "/admin/formations" },
    { icon: BarChart3, label: "Statistiques" },
    { icon: FileText, label: "Documents" },
  ];

  const bottomNavItems = [
    { icon: Settings, label: "Paramètres" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        title="Fakto Admin"
        navItems={navItems}
        bottomNavItems={bottomNavItems}
      />
      
      <div className={cn("transition-all duration-300", sidebarOpen ? "ml-64" : "ml-16")}>
        <TopBar
          userName={userName}
          userAvatar={userAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"}
        />
        
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
