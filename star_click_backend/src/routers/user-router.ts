import { Router } from "express";

import { usersPost } from "@/controllers/user-controller";
import { newUserSchema } from "@/schemas";
import { validateBody } from "@/middlewares";

const userRouter = Router();

userRouter.post("/sign-up", validateBody(newUserSchema), usersPost);

export { userRouter };
