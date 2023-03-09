import userService from "@/services/user-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

import { ApplicationError } from "@/utils/protocols";
import { CreateUserParams } from "@/services/user-service";

export async function usersPost(req: Request, res: Response) {
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
