import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { conflictError } from "@/errors";

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

export type CreateUserParams = Omit<User, "createdAt" | "updatedAt">;

const userService = {
  createUser,
};

export default userService;
