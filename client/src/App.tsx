import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import Card from './components/Card/Card';
import Nav from './components/Nav/Nav';
import { selectMovies, getFavorites, removeFavorite, addFavorite, Favorites } from './slice/moviesSlice';
import { heckLogin } from './slice/serviceSlice';


const App: React.FC = () => {
    const dispatch = useDispatch();
    const { movies, favorites } = useSelector(selectMovies);

    useEffect(() => {
        dispatch(heckLogin())
        dispatch(getFavorites())
    }, [dispatch])

    const handleRemoveFavorite = (movie: Favorites) => {
        dispatch(removeFavorite(movie.imdbID))
    }

    const handleAddFavorite = (movie: Favorites) => {
        dispatch(addFavorite(movie))
    }

    return (
        <main>
            <Nav />
            <Main>
                <MovieGrid>
                    {movies.Search?.map((m: any,) => (
                        <Card
                            imdbID={m.imdbID}
                            key={m.imdbID}
                            title={m.Title}
                            year={m.Year}
                            poster={m.Poster}
                            onClickFollow={(movie) => handleAddFavorite(movie)}
                        />
                    ))}
                </MovieGrid>
                {favorites && (
                    <FavoriteGrid>
                        <FavoriteTitle>Favorites</FavoriteTitle>
                        {favorites.map((f) => (
                            <Card
                                imdbID={f.imdbID}
                                key={f.imdbID}
                                title={f.title}
                                year={f.year}
                                poster={f.poster}
                                onClickFollow={(id) => handleRemoveFavorite(id)}
                            />
                        ))}
                    </FavoriteGrid>
                )
                }
            </Main>
        </main>
    );
}

const Main = styled.section`
    margin-top: 70px;
    display: flex;
`;

const MovieGrid = styled.div`
    width: 100%;
    padding: 0 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
    grid-template-rows:repeat(auto-fill, 325px);
    grid-gap: 1rem;
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
