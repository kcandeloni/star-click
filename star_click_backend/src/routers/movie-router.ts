import { Router } from "express";

import { getTitleId, searchTitle } from "@/controllers/movie-controller";

const movieRouter = Router();

movieRouter
  .get("/get-title", getTitleId)
  .get("/search-title", searchTitle);

export { movieRouter };
