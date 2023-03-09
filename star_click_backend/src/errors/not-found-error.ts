import { ApplicationError } from "@/utils/protocols";

export function notFoundError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "No result for this search!",
  };
}
