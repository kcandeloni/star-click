import api from "../api";

import { notFoundError } from "@/errors";
import { OMDBAPISearchParams } from "../protocols";

async function searchAPI({searchField, page }: OMDBAPISearchParams) {
  try {
    const result = await api.get(`?apikey=${process.env.OMDB_API_KEY}&s=${searchField}&page=${page}`);
    return result.data;
  } catch (error) {
    throw notFoundError;
  }
}

async function getByIdAPI(imdbID: string){
  try {
    const result = await api.get(`?apikey=${process.env.OMDB_API_KEY}&i=${imdbID}&plot=full`);
    return result.data;
  } catch (error) {
    throw notFoundError;
  }
}

const OMDBAPI =  {
  searchAPI,
  getByIdAPI,
};

export default OMDBAPI;