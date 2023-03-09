import { ApplicationError } from "@/utils/protocols";

export function unauthorizedError(): ApplicationError {
  return {
    name: "UnauthorizedError",
    message: "You do not have authorization to perform this action",
  };
}
