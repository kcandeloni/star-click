import { prisma } from "@/database";
import { User } from "@prisma/client";

export type newUserParams = Omit<User, "createdAt" | "updatedAt" | "id">;
export type updateUserParams = Pick<User, "id" | "avatar" >;


async function create(data: newUserParams) {
  return prisma.user.create({
    data,
  });
}

async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email
    }
  });
}


async function findByUserId(id: number) {
  return prisma.user.findFirst({
    where: {
      id
    }
  });
}

async function updateUser({id, avatar}: updateUserParams) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      avatar
    }
  });
}

const userRepository = {
  create,
  findByEmail,
  findByUserId,
  updateUser,
};

export default userRepository;
