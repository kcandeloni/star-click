export type ApplicationError = {
  name: string;
  message: string;
};

export type TitleList = {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string,
  Response: string
}

export type TitleResume = {
  Title: string,
  Year: string,
  Runtime: string,
  Genre: string,
  Director: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Poster: string,
  Metascore: string,
  imdbRating: string,
  imdbID: string,
  Type: string,
  Response: string
}

export type OMDBAPIRequestError = {
  Response: string,
  Error: string
}

export type OMDBAPISearchParams = {
  searchField: string,
  page: number,
}
