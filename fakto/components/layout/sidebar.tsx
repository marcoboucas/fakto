"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href?: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  navItems: NavItem[];
  bottomNavItems?: NavItem[];
}

export function Sidebar({ isOpen, onToggle, title, navItems, bottomNavItems }: SidebarProps) {
  const pathname = usePathname();
  
  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full border-r bg-card flex flex-col transition-all duration-300",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="h-[73px] flex items-center justify-between px-4 border-b">
        <Button variant="ghost" size="icon" onClick={onToggle}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        {isOpen && <span className="font-semibold">{title}</span>}
      </div>
      
      <div className="flex flex-col gap-2 py-4 px-2 w-full flex-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.href ? pathname === item.href : false;
          const ButtonComponent = (
            <Button 
              variant="ghost" 
              className={cn(
                "justify-start gap-3 w-full", 
                !isOpen && "justify-center px-0",
                isActive && "bg-muted"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {isOpen && <span className="text-left">{item.label}</span>}
            </Button>
          );
          
          return item.href ? (
            <Link key={index} href={item.href}>
              {ButtonComponent}
            </Link>
          ) : (
            <div key={index}>{ButtonComponent}</div>
          );
        })}
      </div>

      {bottomNavItems && bottomNavItems.length > 0 && (
        <div className="pb-4 px-2 w-full">
          {bottomNavItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button 
                key={index}
                variant="ghost" 
                className={cn(
                  "justify-start gap-3", 
                  !isOpen && "justify-center px-0"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {isOpen && <span className="text-left">{item.label}</span>}
              </Button>
            );
          })}
        </div>
      )}
    </aside>
  );
}
