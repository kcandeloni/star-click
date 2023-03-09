import { ApplicationError } from "@/utils/protocols";

export function conflictError(message: string): ApplicationError {
  return {
    name: "ConflictError",
    message,
  };
}
