"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Formation } from "@/types/formations";

interface FormationCardProps {
  formation: Formation;
  className?: string;
}

export function FormationCard({ formation, className }: FormationCardProps) {
  const getStatusLabel = () => {
    switch (formation.status) {
      case "in-progress":
        return `En cours (${formation.progress}% vue)`;
      case "completed":
        return "Terminée (100%)";
      case "not-started":
        return "Pas commencé";
    }
  };

  const getStatusVariant = () => {
    switch (formation.status) {
      case "in-progress":
        return "secondary";
      case "completed":
        return "default";
      case "not-started":
        return "outline";
    }
  };

  const getButtonLabel = () => {
    switch (formation.status) {
      case "in-progress":
        return "Continuer le cours";
      case "completed":
        return "Revoir le cours";
      case "not-started":
        return "Commencer";
    }
  };

  return (
    <Link href={`/app/formations/${formation.id}`}>
      <Card className={cn("hover:shadow-md transition-shadow cursor-pointer", className)}>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="relative w-40 h-28 flex-shrink-0">
            <img
              src={formation.image}
              alt={formation.title}
              className="w-full h-full rounded-lg object-cover"
            />
            {formation.status === "not-started" && formation.elementsCount && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-gray-700" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            {formation.lastViewed && (
              <p className="text-xs text-muted-foreground mb-1">
                {formation.lastViewed}
              </p>
            )}
            <h3 className="font-semibold mb-2 text-base line-clamp-2">
              {formation.title}
            </h3>
            {formation.status === "not-started" && formation.elementsCount && (
              <p className="text-sm text-muted-foreground mb-3">
                {formation.elementsCount} élément{formation.elementsCount > 1 ? "s" : ""}
              </p>
            )}
            {formation.status === "in-progress" && (
              <Button variant="secondary" size="sm" className="mb-2">
                {getButtonLabel()}
              </Button>
            )}
            {(formation.status === "completed" || formation.status === "not-started") && (
              <Button variant="secondary" size="sm" className="mb-2">
                {getButtonLabel()}
              </Button>
            )}
          </div>
          
          <div className="flex flex-col items-end justify-between">
            <Badge 
              variant={getStatusVariant()}
              className={cn(
                formation.status === "completed" && "bg-green-500 text-white hover:bg-green-600"
              )}
            >
              {getStatusLabel()}
            </Badge>
            {formation.status === "in-progress" && (
              <div className="w-32">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all" 
                    style={{ width: `${formation.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
