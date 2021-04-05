import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { sevMovies } from '../../slice/moviesSlice'

const Search: React.FC = () => {
    const dispatch = useDispatch();

    // const [movies, setMovies] = useState<any>([])
    let timeout: any = 0;
    const search = (value: string) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            axios({
                method: 'get',
                url: `http://localhost:3001/movies?s=${value}`,
            })
                .then(({ data }) => {
                    console.log('data', data)
                    if (data.Response === "True") {
                        return dispatch(sevMovies(data))
                    }
                })
                .catch((err) => err.response)
        }, 300)
    }
    return (
        <InputWrap>
            <Input
                type="text"
                onChange={(e) => search(e.target.value)}
                placeholder="Search Movie"
            />
        </InputWrap>
    )
}

const InputWrap = styled.div`

`;

const Input = styled.input`
    background: #FFFFFF;
    border: 1px solid rgba(31, 32, 65, 0.25);
    box-sizing: border-box;
    border-radius: 7px;
    padding: 12px;
    min-width: 20vw;
`;

export default Search;
