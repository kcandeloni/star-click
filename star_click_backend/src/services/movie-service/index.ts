import { notFoundError, invalidDataError } from "@/errors";

import OMDBAPI from "@/utils/omdbAPI";
import { OMDBAPISearchParams, TitleResume, TitleList } from "@/utils/protocols";

import { searchFieldSchema } from "@/schemas/movie-schema";

function validateQuery (search: string) {
  const { error } = searchFieldSchema.validate({ search }, { abortEarly: false })
  if(error) throw invalidDataError(error.details.map((d) => d.message))
}


async function getTitleService(imdbID: string): Promise<TitleResume> {
  validateQuery(imdbID);
  const title = await OMDBAPI.getByIdAPI(imdbID);
  if(title.Response === "False") {
    throw notFoundError();
  }
  return title;
}

async function searchTitleSevice({ searchField, page }: OMDBAPISearchParams): Promise<TitleList[]> {
  validateQuery(searchField);
  if(isNaN(page) || page < 1) page = 1;
  const titleList = await OMDBAPI.searchAPI({searchField, page});
  if(titleList.Response === "False") {
    throw notFoundError();
  }
  return titleList;
}

const movieService = {
  getTitleService,
  searchTitleSevice,
};

export default movieService;
