"use client";

import { useState } from "react";

/**
 * Decides when to show validation errors on the auth forms.
 *
 * `errors` is recomputed from the current values on every render, so a field's
 * error clears as soon as its value becomes valid. An error is only shown once
 * the field has been blurred or the user has tried to submit.
 */
export function useFieldErrors<K extends string>(errors: Partial<Record<K, string>>) {
  const [touched, setTouched] = useState<Partial<Record<K, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  return {
    /** Error to display for a field, or undefined while it should stay quiet. */
    shown: (key: K) => (submitted || touched[key] ? errors[key] : undefined),
    /** onBlur handler that marks a field as touched. */
    touch: (key: K) => () => setTouched((t) => ({ ...t, [key]: true })),
    /** Call on submit; reveals every error and returns true when the form is valid. */
    attempt: () => {
      setSubmitted(true);
      return !Object.values(errors).some(Boolean);
    },
  };
}
