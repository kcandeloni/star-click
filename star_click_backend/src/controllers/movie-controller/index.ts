import { Request, Response } from "express";
import httpStatus from "http-status";

import movieService from "@/services/movie-service";

export async function getTitleId(req: Request, res: Response) {
  const { imdbID } = req.query;
  
  if(typeof imdbID !== "string") return res.sendStatus(httpStatus.BAD_REQUEST); 

  try {
    const title = await movieService.getTitleService(imdbID);
    return res.status(httpStatus.OK).send(title);
  } catch (error) {
    if (error instanceof Error && error.name === "notFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function searchTitle(req: Request, res: Response) {
  const page = Number(req.query.page);
  const { search } = req.query;
  if(typeof search !== "string") return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const titleList = await movieService.searchTitleSevice({page, searchField: search});
    return res.status(httpStatus.OK).send(titleList);
  } catch (error) {
    if (error instanceof Error && error.name === "notFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST);
  }
}

