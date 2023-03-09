import bcrypt from "bcrypt";

import { User } from "@prisma/client";
import userRepository, { updateUserParams } from "@/repositories/user-repository";
import { conflictError, notFoundError, unauthorizedError } from "@/errors";


export async function createUser({ name, email, password, avatar }: CreateUserParams): Promise<User> {
  await validateUniqueEmail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    name,
    email,
    password: hashedPassword,
    avatar,
  });
}

async function validateUniqueEmail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if ( userWithSameEmail?.id ) {
    throw conflictError("emailDuplicate");
  }
}

async function updateUser(params: updateUserParams, userId: number) {
  const user = await userRepository.findByUserId(params.id);
  if(!user?.id) {
    throw notFoundError();
  }
  if(user.id !== userId) {
    throw unauthorizedError();
  }
  const updateUser = await userRepository.updateUser(params);
  const  updateParams = JSON.parse(JSON.stringify(updateUser));
  delete updateParams["password"];
  return updateParams;
}

export type CreateUserParams = Omit<User, "createdAt" | "updatedAt">;

const userService = {
  createUser,
  updateUser,
};

export default userService;
