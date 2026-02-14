"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, LucideIcon } from "lucide-react";

export type StepStatus = "completed" | "current" | "upcoming" | "locked";

export interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  status: StepStatus;
}

interface StepperProps {
  steps: Step[];
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "compact";
  onStepClick?: (stepId: string, index: number) => void;
  className?: string;
  showConnector?: boolean;
  currentStepBadge?: React.ReactNode;
}

export function Stepper({
  steps,
  orientation = "horizontal",
  variant = "default",
  onStepClick,
  className,
  showConnector = true,
  currentStepBadge,
}: StepperProps) {
  const completedSteps = steps.filter(s => s.status === "completed").length;
  const progressPercentage = steps.length > 1 
    ? (completedSteps / (steps.length - 1)) * 100 
    : 0;

  if (orientation === "vertical") {
    return (
      <div className={cn("space-y-4", className)}>
        {steps.map((step, index) => {
          const Icon = step.icon || Check;
          const isClickable = onStepClick && (step.status === "completed" || step.status === "current");
          
          return (
            <div key={step.id} className="relative">
              <div className="flex gap-4">
                {/* Step Circle */}
                <div className="relative flex flex-col items-center">
                  <button
                    onClick={() => isClickable && onStepClick(step.id, index)}
                    disabled={!isClickable}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center relative z-10 border-4 border-background transition-all",
                      step.status === "completed" && "bg-primary text-primary-foreground",
                      step.status === "current" && "bg-primary text-primary-foreground ring-2 ring-primary/20 ring-offset-2",
                      step.status === "upcoming" && "bg-muted text-muted-foreground",
                      step.status === "locked" && "bg-muted text-muted-foreground opacity-60",
                      isClickable && "cursor-pointer hover:scale-110"
                    )}
                  >
                    {step.status === "completed" ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                    {step.status === "current" && currentStepBadge && (
                      <div className="absolute -top-2 -right-2">
                        {currentStepBadge}
                      </div>
                    )}
                  </button>
                  
                  {/* Vertical Connector */}
                  {showConnector && index < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-muted my-2" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 pb-8">
                  <h3 className={cn(
                    "font-semibold text-sm mb-1",
                    step.status === "locked" && "text-muted-foreground"
                  )}>
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal orientation
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        {showConnector && (
          <>
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </>
        )}
        
        {/* Steps */}
        {steps.map((step, index) => {
          const Icon = step.icon || Check;
          const isLast = index === steps.length - 1;
          const isClickable = onStepClick && (step.status === "completed" || step.status === "current");
          
          return (
            <div 
              key={step.id} 
              className="flex flex-col items-center z-10"
              style={variant === "default" ? { 
                flex: isLast ? '0 0 auto' : '1 1 0%',
                maxWidth: isLast ? 'auto' : `${100 / steps.length}%`
              } : undefined}
            >
              <button
                onClick={() => isClickable && onStepClick(step.id, index)}
                disabled={!isClickable}
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-4 relative border-4 border-background transition-all",
                  step.status === "completed" && "bg-primary text-primary-foreground",
                  step.status === "current" && "bg-primary text-primary-foreground ring-2 ring-primary/20 ring-offset-2",
                  step.status === "upcoming" && "bg-muted text-muted-foreground",
                  step.status === "locked" && "bg-muted text-muted-foreground opacity-60",
                  isClickable && "cursor-pointer hover:scale-110",
                  variant === "compact" && "w-12 h-12 mb-2"
                )}
              >
                {step.status === "completed" ? (
                  <Check className={cn("h-6 w-6", variant === "compact" && "h-4 w-4")} />
                ) : (
                  <Icon className={cn("h-6 w-6", variant === "compact" && "h-4 w-4")} />
                )}
                {step.status === "current" && currentStepBadge && (
                  <div className="absolute -top-3 -right-3">
                    {currentStepBadge}
                  </div>
                )}
              </button>
              
              <div className={cn(
                "text-center",
                variant === "default" && "max-w-[200px]",
                variant === "compact" && "max-w-[120px]"
              )}>
                <h3 className={cn(
                  "font-semibold mb-1",
                  variant === "default" && "text-sm",
                  variant === "compact" && "text-xs",
                  step.status === "locked" && "text-muted-foreground"
                )}>
                  {step.title}
                </h3>
                {step.description && variant === "default" && (
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
