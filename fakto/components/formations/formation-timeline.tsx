"use client";

import { FormationStep } from "@/types/formations";
import { Stepper, Step } from "@/components/ui/stepper";
import { Lock, Play } from "lucide-react";

interface FormationTimelineProps {
  steps: FormationStep[];
}

export function FormationTimeline({ steps }: FormationTimelineProps) {
  // Convert FormationStep to Step format
  const stepperSteps: Step[] = steps.map((step) => {
    const getIcon = () => {
      if (step.type === "quiz") return Play;
      if (step.type === "evaluation") return Play;
      return Play;
    };

    return {
      id: step.id,
      title: step.title,
      description: step.description,
      icon: step.status === "locked" ? Lock : getIcon(),
      status: step.status,
    };
  });

  return (
    <Stepper 
      steps={stepperSteps}
      currentStepBadge={
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold">
          M
        </div>
      }
    />
  );
}
