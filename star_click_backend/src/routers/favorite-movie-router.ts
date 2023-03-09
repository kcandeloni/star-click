import { Router } from "express";

import { 
  getFavoriteMovie, 
  postNewFavoriteMovie, 
  deleteFavoriteMovie } from "@/controllers/favorite-movie-controller";
import { favoriteMovieIdSchema, imdbIDMovieSchema } from "@/schemas";
import { validateBody, authenticateToken } from "@/middlewares";

const favoriteMovieRouter = Router();

favoriteMovieRouter
  .all("/*", authenticateToken)
  .post("/create", validateBody(imdbIDMovieSchema), postNewFavoriteMovie)
  .delete("/delete", validateBody(favoriteMovieIdSchema), deleteFavoriteMovie)
  .get("/get", getFavoriteMovie);

export { favoriteMovieRouter };
