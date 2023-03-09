import { Request, Response } from "express";
import httpStatus from "http-status";

import userService, { CreateUserParams} from "@/services/user-service";
import authenticationService, { SignInParams } from "@/services/auth-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function signUpPost(req: Request, res: Response) {
  const body: CreateUserParams = req.body;

  try {
    const user = await userService.createUser({ ...body });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function signInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function updateUserPut(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  
  try {
    const updateUser = await userService.updateUser(req.body, userId);
    return res.status(httpStatus.OK).send(updateUser);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
