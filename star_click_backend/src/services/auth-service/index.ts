import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApplicationError } from "@/utils/protocols";

export function invalidCredentialsError(): ApplicationError {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect",
  };
}

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);
  const sessionUser = JSON.parse(JSON.stringify(user));
  delete sessionUser["password"];

  return {
    sessionUser,
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email);
  if (!user?.id) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, "email" | "password">;

type SignInResult = {
  sessionUser: Omit<User, "password" | "createdAt" | "updatedAt">;
  token: string;
};

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;

const authenticationService = {
  signIn,
};

export default authenticationService;
