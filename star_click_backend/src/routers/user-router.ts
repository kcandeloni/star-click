import { Router } from "express";

import { signUpPost, signInPost, updateUserPut } from "@/controllers/user-controller";
import { newUserSchema, loginSchema, updateUserSchema } from "@/schemas";
import { validateBody, authenticateToken } from "@/middlewares";

const userRouter = Router();

userRouter
  .post("/sign-up", validateBody(newUserSchema), signUpPost)
  .post("/sign-in", validateBody(loginSchema), signInPost)
  .put("/update", validateBody(updateUserSchema), authenticateToken, updateUserPut);

export { userRouter };
