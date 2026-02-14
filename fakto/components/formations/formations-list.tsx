"use client";

import { FormationCard } from "@/components/formations/formation-card";
import { Formation } from "@/types/formations";
import { useState } from "react";

interface FormationsListProps {
  formations: Formation[];
}

export function FormationsList({ formations }: FormationsListProps) {
  const [activeTab, setActiveTab] = useState<"enrolled" | "completed">("enrolled");

  const enrolledFormations = formations.filter(
    (f) => f.status === "in-progress" || f.status === "not-started"
  );
  const completedFormations = formations.filter((f) => f.status === "completed");

  const displayedFormations =
    activeTab === "enrolled" ? enrolledFormations : completedFormations;

  return (
    <>
      {/* Tabs */}
      <div className="flex gap-8 mb-6 border-b">
        <button
          onClick={() => setActiveTab("enrolled")}
          className={`pb-4 px-4 font-medium transition-colors ${
            activeTab === "enrolled"
              ? "border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Inscrits ({enrolledFormations.length})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`pb-4 px-4 font-medium transition-colors ${
            activeTab === "completed"
              ? "border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Terminées ({completedFormations.length})
        </button>
      </div>

      {/* Formations List */}
      <div className="space-y-4">
        {displayedFormations.length > 0 ? (
          displayedFormations.map((formation) => (
            <FormationCard key={formation.id} formation={formation} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {activeTab === "enrolled"
                ? "Aucune formation inscrite"
                : "Aucune formation terminée"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
