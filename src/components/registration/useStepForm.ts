"use client";

import { useState } from "react";
import type { Errors } from "./validation";

function scrollToStepper() {
  document.getElementById("reg-stepper")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToFirstError() {
  window.requestAnimationFrame(() => {
    const field = document.querySelector<HTMLElement>(".reg_scope [data-invalid='true']");
    if (!field) return;
    field.scrollIntoView({ behavior: "smooth", block: "center" });
    field.querySelector<HTMLElement>("input:not([type='file']), select, textarea")?.focus({ preventScroll: true });
  });
}

// Step navigation for a multi-step form. A step counts as completed once it passes validation;
// the stepper can jump to any step whose earlier steps are all completed.
export function useStepForm(totalSteps: number, validateStep: (step: number) => Errors) {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [errors, setErrors] = useState<Errors>({});

  function check(target: number) {
    const next = validateStep(target);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      scrollToFirstError();
      return false;
    }
    return true;
  }

  function markCompleted(target: number) {
    setCompleted((current) => (current.includes(target) ? current : [...current, target]));
  }

  function goNext() {
    if (!check(step)) return;
    markCompleted(step);
    setStep((current) => Math.min(current + 1, totalSteps));
    scrollToStepper();
  }

  function goBack() {
    setErrors({});
    setStep((current) => Math.max(current - 1, 1));
    scrollToStepper();
  }

  function canJump(target: number) {
    for (let index = 1; index < target; index += 1) {
      if (!completed.includes(index)) return false;
    }
    return true;
  }

  function jumpTo(target: number) {
    if (target === step || !canJump(target)) return;
    setErrors({});
    setStep(target);
    scrollToStepper();
  }

  // Validates every step before submission; moves to the first failing step.
  function validateAll() {
    for (let index = 1; index <= totalSteps; index += 1) {
      const next = validateStep(index);
      if (Object.keys(next).length > 0) {
        setStep(index);
        setErrors(next);
        scrollToFirstError();
        return false;
      }
    }
    setErrors({});
    return true;
  }

  function clearError(key: string) {
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function reset() {
    setStep(1);
    setCompleted([]);
    setErrors({});
  }

  return { step, completed, errors, goNext, goBack, canJump, jumpTo, validateAll, clearError, markCompleted, reset };
}
