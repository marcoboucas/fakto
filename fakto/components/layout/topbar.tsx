"use client";

import { Button } from "@/components/ui/button";
import { Search, Bell } from "lucide-react";
import { ReactNode } from "react";

interface TopBarProps {
  userAvatar?: string;
  userName?: string;
  additionalActions?: ReactNode;
}

export function TopBar({ userAvatar, userName, additionalActions }: TopBarProps) {
  return (
    <header className="h-[73px] border-b px-8 flex items-center justify-between" style={{ backgroundColor: '#F8EFE2' }}>
      <div className="flex items-center gap-4 flex-1">

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>
        {additionalActions}
        <div className="flex items-center gap-2">
          {userAvatar && (
            <img
              src={userAvatar}
              alt={userName || "User"}
              className="w-8 h-8 rounded-full"
            />
          )}
          {userName && <span className="text-sm font-medium">{userName}</span>}
        </div>
      </div>
    </header>
  );
}
