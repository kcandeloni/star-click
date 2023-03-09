import { prisma } from "@/database";
import { FavoritesMovies } from "@prisma/client";

export type favoriteMovieParams = Omit<FavoritesMovies, "createdAt" | "updatedAt" | "id">;


async function create(data: favoriteMovieParams) {
  return prisma.favoritesMovies.create({
    data,
  });
}

async function disfavorMovie(id: number) {
  return prisma.favoritesMovies.delete({
    where: {
      id
    }
  });
}


async function findFavoritesMoviesByUserId(userId: number) {
  return prisma.favoritesMovies.findMany({
    where: {
      userId
    }
  });
}

async function findFavoritesMoviesById(id: number) {
  return prisma.favoritesMovies.findFirst({
    where: {
      id
    }
  });
}

async function findFavoritesMovies(data: favoriteMovieParams) {
  return prisma.favoritesMovies.findFirst({
    where: {
      ...data
    }
  });
}

const favoritesMoviesRepository = {
  create,
  disfavorMovie,
  findFavoritesMoviesByUserId,
  findFavoritesMoviesById,
  findFavoritesMovies,
};

export default favoritesMoviesRepository;
