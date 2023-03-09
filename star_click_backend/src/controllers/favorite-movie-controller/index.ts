import { Response } from "express";
import httpStatus from "http-status";

import favoritesMoviesService from "@/services/favorite-movie-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function postNewFavoriteMovie(req: AuthenticatedRequest, res: Response) {

  try {
    const newFavorite = await favoritesMoviesService.newFavoriteMovie({...req.body, userId: req.userId});
    return res.status(httpStatus.CREATED).send(newFavorite);
  } catch (error) {
    if (error instanceof Error && error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteFavoriteMovie(req: AuthenticatedRequest, res: Response) {

  try {
    const dropFavorite = await favoritesMoviesService.dropFavoriteMovie({...req.body, userId: req.userId});
    return res.status(httpStatus.OK).send(dropFavorite);
  } catch (error) {
    if (error instanceof Error && error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    if (error instanceof Error && error.name === "notFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getFavoriteMovie(req: AuthenticatedRequest, res: Response) {

  try {
    const myFavoritesMovies = await favoritesMoviesService.getFavoritesMovies(req.userId);
    return res.status(httpStatus.OK).send(myFavoritesMovies);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
