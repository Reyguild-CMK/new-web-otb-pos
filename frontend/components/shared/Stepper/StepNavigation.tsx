"use client";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface StepNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  isLoading?: boolean;
  currentStep: number;
  totalSteps: number;
  nextLabel?: string;
  hideNext?: boolean;
  nextButtonType?: "button" | "submit";
  nextDisabled?: boolean;
}

export function StepNavigation({
  onBack,
  onNext,
  isFirstStep = false,
  isLastStep = false,
  isLoading = false,
  currentStep,
  totalSteps,
  nextLabel,
  hideNext = false,
  nextButtonType = "button",
  nextDisabled = false,
}: StepNavigationProps) {
  return (
    <div className="w-full mt-2">
      <Separator className="mb-6" />
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isFirstStep || isLoading}
          className="cursor-pointer w-25 h-8"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <p className="text-sm text-muted-foreground hidden sm:block">
          {currentStep} dari {totalSteps}
        </p>
        {!hideNext ? (
          <Button
            type={nextButtonType}
            onClick={nextButtonType === "button" ? onNext : undefined}
            disabled={isLoading || nextDisabled}
            className="cursor-pointer bg-btn-next-bg text-btn-next-text w-auto px-4 h-8 hover:bg-btn-next-bg/80 min-w-24"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {nextLabel || (isLastStep ? "Submit" : "Next")}
            {!isLoading && !isLastStep && !nextLabel && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        ) : (
          <div className="w-24" />
        )}
      </div>
    </div>
  );
}
