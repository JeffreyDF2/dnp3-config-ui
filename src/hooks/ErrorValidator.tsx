import { useEffect } from "react";
import { useConfig } from "@/context/ConfigContext";
import { useErrorContext } from "@/context/ErrorContext";
import { validateConfiguration } from "@/utils/validation";
import type { ErrorMap } from "@/types/errorMap";

const ErrorValidator = () => {
  const { state: config } = useConfig();
  const { dispatch } = useErrorContext();

  useEffect(() => {
    const validationErrors = validateConfiguration(config);
    dispatch({ type: "CLEAR_ALL_ERRORS" });

    for (const section in validationErrors) {
      const errors = validationErrors[section];
      if (errors.length > 0) {
        dispatch({
          type: "SET_ERRORS",
          section: section as keyof ErrorMap,
          errors,
        });
      }
    }
  }, [config]);

  return null; // nothing to render
};

export default ErrorValidator;
