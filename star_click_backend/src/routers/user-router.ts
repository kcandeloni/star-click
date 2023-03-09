import { Router } from "express";

import { signUpPost, signInPost, updateUserPut } from "@/controllers/user-controller";
import { newUserSchema, loginSchema, updateUserSchema } from "@/schemas";
import { validateBody, authenticateToken } from "@/middlewares";

const userRouter = Router();

userRouter
  .post("/sign-up", validateBody(newUserSchema), signUpPost)
  .post("/sign-in", validateBody(loginSchema), signInPost)
  .all("/*", authenticateToken)
  .put("/update", validateBody(updateUserSchema), updateUserPut);

export { userRouter };
