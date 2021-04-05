import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import Card from './components/Card/Card';
import Nav from './components/Nav/Nav';
import { selectMovies } from './slice/moviesSlice';
import { heckLogin } from './slice/serviceSlice';


const App: React.FC = () => {
    const dispatch = useDispatch();
    const { movies } = useSelector(selectMovies);

    useEffect(() => {
        dispatch(heckLogin())
    }, [dispatch])

    console.log('movies', movies)
    return (
        <main>
            <Nav />
            <Main>
                <MovieGrid>
                    {movies.Search?.map((m: any,) => (
                        <Card
                            key={m.imdbID}
                            title={m.Title}
                            year={m.Year}
                            poster={m.Poster}
                        />
                    ))}
                </MovieGrid>
            </Main>
        </main>
    );
}

const Main = styled.section`
    margin-top: 70px;
`;

const MovieGrid = styled.div`
    padding: 0 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 1rem;
`;

export default App;
