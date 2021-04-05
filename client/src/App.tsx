import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import Card from './components/Card/Card';
import Nav from './components/Nav/Nav';
import { selectMovies, getFavorites, removeFavorite, nextPage, prevPage, addFavorite, Favorites } from './slice/moviesSlice';
import { heckLogin, selectUser } from './slice/serviceSlice';


const App: React.FC = () => {
    const dispatch = useDispatch();
    const { movies, favorites, page } = useSelector(selectMovies);
    const { service } = useSelector(selectUser);

    useEffect(() => {
        dispatch(heckLogin())
    }, [dispatch])

    useEffect(() => {
        dispatch(getFavorites())
    }, [service, dispatch])

    const handleRemoveFavorite = (movie: Favorites) => {
        dispatch(removeFavorite(movie.imdbID))
    }

    const handleAddFavorite = (movie: Favorites) => {
        dispatch(addFavorite(movie))
    }
    const handleNextPage = () => {
        dispatch(nextPage())
    }
    const handlePrevPage = () => {
        dispatch(prevPage())
    }
    return (
        <main>
            <Nav />
            <Main>
                <MovieWrap>
                    <MovieGrid>
                        {movies.Search?.map((m: any,) => (
                            <Card
                                imdbID={m.imdbID}
                                key={m.imdbID}
                                title={m.Title}
                                year={m.Year}
                                poster={m.Poster}
                                showFavorite={service.token ? true : false}
                                onClickFollow={(movie) => handleAddFavorite(movie)}
                            />
                        ))}
                    </MovieGrid>
                    {movies.Search?.length && (
                        <PaginationWrap>
                            {page > 1 ? (<PaginationButton onClick={handlePrevPage}>Prev</PaginationButton>) : null}
                            <PaginationButton onClick={handleNextPage}>Next</PaginationButton>
                        </PaginationWrap>

                    )}
                    {console.log(page < 1)}
                </MovieWrap>
                {favorites?.length
                    ? (<FavoriteGrid>
                        <FavoriteTitle>Favorites ({favorites.length})</FavoriteTitle>
                        {favorites.map((f) => (
                            <Card
                                imdbID={f.imdbID}
                                key={f.imdbID}
                                title={f.title}
                                year={f.year}
                                poster={f.poster}
                                showFavorite={service.token ? true : false}
                                onClickFollow={(id) => handleRemoveFavorite(id)}
                            />
                        ))}
                    </FavoriteGrid>)
                    : null
                }
            </Main>
        </main>
    );
}

const Main = styled.section`
    margin-top: 70px;
    display: flex;
`;

const PaginationWrap = styled.div`
    display: flex;
    width:100%;
    justify-content:center;
    margin-top: 15px;
`;

const PaginationButton = styled.div`
    margin-top: 10px;
    width: 44px;
    height: 44px;
    border: solid 2px #BC9CFF;
    border-radius: 22px;
    background: transparent;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;

`;
const MovieGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
    grid-template-rows:repeat(auto-fill, 325px);
    grid-gap: 1rem;
    height: calc(100vh - 130px);
    overflow-x: scroll;
`;

const MovieWrap = styled.div`
    width: 100%;
    padding: 0 1rem;
`;

const FavoriteTitle = styled.h2`
    margin: 0 auto;
`;

const FavoriteGrid = styled.div`
    width:300px;
    height: calc(100vh - 70px);
    overflow-x: scroll;
    padding: 0 1rem;
    display: grid;
    grid-template-columns: 250px;
    grid-template-rows: 30px repeat(auto-fill,300px);
    grid-gap: 1rem;

`;

export default App;
