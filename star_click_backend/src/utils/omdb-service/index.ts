import api from "../api";

async function searchTitle(string: string) {
  try {
    console.log(string)
    const result = await api.get(`?apikey=${process.env.OMDB_API_KEY}&s=${string}`);
    return result.data;
  } catch (error) {
    return error; 
  }
}

export {
  searchTitle,
};
