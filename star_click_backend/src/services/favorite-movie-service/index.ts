import favoritesMoviesRepository from "@/repositories/favorite-movie-repository";
import { favoriteMovieParams } from "@/repositories/favorite-movie-repository";
import { unauthorizedError, notFoundError, conflictError } from "@/errors";

type dropFavoriteParams = {
  id: number,
  userId: number
}

async function newFavoriteMovie(params: favoriteMovieParams) {
  const duplicateCheck = await favoritesMoviesRepository.findFavoritesMovies(params);
  if(duplicateCheck?.id) throw conflictError("movie is already your favorite");
  const newFavorite = await favoritesMoviesRepository.create(params);
  return newFavorite;
}

async function dropFavoriteMovie({id, userId}: dropFavoriteParams) {
  const favorite = await favoritesMoviesRepository.findFavoritesMoviesById(id);
  if(!favorite?.id) {
    throw notFoundError();
  }
  if(favorite?.userId !== userId) {
    throw unauthorizedError();
  }
  const dropFavorite = await favoritesMoviesRepository.disfavorMovie(id);
   
  return dropFavorite;
}

async function getFavoritesMovies(userId: number) {
  const FavoritesMovies = await favoritesMoviesRepository.findFavoritesMoviesByUserId(userId);
   
  return FavoritesMovies;
}

const favoritesMoviesService = {
  newFavoriteMovie,
  dropFavoriteMovie,
  getFavoritesMovies,
};

export default favoritesMoviesService;
