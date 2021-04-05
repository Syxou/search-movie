import axios from "axios"


export const searchMovies = async (search: string) => {
    const movies = await searchMoviesInApi(search);
    return movies;
}


const searchMoviesInApi = async (search: string) => {
    return axios({
        method: 'get',
        url: `http://www.omdbapi.com/?apikey=d9667a10&s=${search}&type=movie`,
    })
        .then((res) => res.data)
        .catch((err) => err.response)
}