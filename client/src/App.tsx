import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import Card from './components/Card/Card';
import Nav from './components/Nav/Nav';
import { selectMovies } from './slice/moviesSlice';

const App: React.FC = () => {
    const { movies } = useSelector(selectMovies);
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
