"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { stepItems } from "@/app/(protected)/pawn/application/layout";

export interface Step {
  label: string;
  icon: LucideIcon;
  href?: string;
}

export const style_card = "rounded-xl border border-border bg-background py-8 px-4 md:px-8 flex flex-col gap-8 shadow-md"

export function Stepper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const activeStep = stepItems.findIndex((step) => step.href === pathname);
  const progress = activeStep / (stepItems.length - 1);

  const handleNext = () => {
    if (activeStep < stepItems.length - 1) {
      const nextStep = stepItems[activeStep + 1];
      if (nextStep?.href) router.push(nextStep.href);
    }
  };

  const handleBack = () => {
    // setActiveStep((prev) => Math.max(0, prev - 1));
    if (activeStep > 0) {
      const prevStep = stepItems[activeStep - 1];
      if (prevStep?.href) router.push(prevStep.href);
    }
  }

  const handleStepClick = (index: number) => {
    const targetStep = stepItems[index];
    if (targetStep?.href) router.push(targetStep.href);
  }

  return (
    <div className="mx-auto w-full">
      {/* Card */}
      <div className="">
        <div className="relative">
          {/* Progress line */}
          <div
            className="absolute top-5 h-0.5 bg-border"
            style={{ left: "12.5%", right: "12.5%" }}
          />
          {/* Progress line if active */}
          <motion.div
            className="absolute top-5 h-0.5 bg-navy-dark origin-left"
            style={{ left: "12.5%", right: "12.5%" }}
            initial={false}
            animate={{ scaleX: progress }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
          {/* Progress dot motion */}
          <motion.span
            className="absolute size-2 rounded-full bg-navy-dark"
            style={{ top: 21, x: "-50%", y: "-50%" }}
            initial={{ left: "12.5%" }}
            animate={{ left: `${12.5 + progress * 75}%` }}
            transition={{ type: "spring", stiffness: 160, damping: 24 }}
          />
          {/* Progress bar motion */}
          <div className="relative flex items-start justify-between">
            {stepItems.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              return (
                // Position Stepper
                <div
                  key={step.label}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  {/* Button per icon */}
                  <button
                    type="button"
                    // menuju ke index
                    onClick={() =>
                      handleStepClick(index)
                    }
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`${step.label}`}
                    className="group relative z-10 flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {/* Background button icon */}
                    <span
                      className={cn(
                        "absolute inset-0 rounded-full transition-colors duration-200",
                        isCompleted || isActive
                          ? "bg-navy-dark"
                          : "bg-muted group-hover:bg-muted/80",
                      )}
                    />

                    {isActive && !prefersReducedMotion && (
                      // Motion button active
                      <motion.span
                        className="absolute inset-0 rounded-full ring-2 ring-primary/50"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{
                          scale: [1, 1.45, 1],
                          opacity: [1, 0.2, 1],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    {/* Motion icon on button */}
                    <motion.div
                      className="relative flex items-center justify"
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 18,
                      }}
                    >
                      {/* Motion if complete (with checked) */}
                      <AnimatePresence mode="wait" initial={false}>
                        {isCompleted ? (
                          <motion.span
                            key="check"
                            initial={{ scale: 0, rotate: -90, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, rotate: 90, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 22,
                            }}
                            className="flex items-center justify-center text-gold"
                          >
                            <Check className="size-5" strokeWidth={3} />
                          </motion.span>
                        ) : (
                          // Motion Icon
                          <motion.span
                            key="icon"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 22,
                            }}
                            className="flex items-center justify-center"
                          >
                            {/* Icon per step */}
                            <step.icon
                              className={cn(
                                "size-5",
                                isActive
                                  ? "text-primary-foreground"
                                  : "text-muted-foreground",
                              )}
                            />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </button>
                  {/* Title per step */}
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors duration-200 hidden md:block",
                      isActive || isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Content */}
        <div className="my-5">
          {children}
        </div>
        {/* Separator */}
        <Separator />
        <div className="flex items-center justify-between my-5">
          {/* Button action */}
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0}
            className="cursor-pointer w-25 h-8"
          >
            <ChevronLeft />
            Back
          </Button>
          <p className="text-sm text-muted-foreground">
            {activeStep + 1} dari {stepItems.length}
          </p>
          <Button
            onClick={handleNext}
            disabled={activeStep === stepItems.length - 1}
            className="cursor-pointer bg-btn-next-bg text-btn-next-text w-25 h-8 hover:bg-btn-next-bg/80"
          >
            Next
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
