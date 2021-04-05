import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { search, selectMovies } from '../../slice/moviesSlice'

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<string>('')
    const { page, error } = useSelector(selectMovies)

    useEffect(() => {
        dispatch(search(value, page));
    }, [page])

    // const [movies, setMovies] = useState<any>([])
    let timeout: any = 0;
    const handleSearch = (val: string) => {
        setValue(val)
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch(search(value, 1));
        }, 300)
    }
    return (
        <div>
            <Input
                value={value}
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search Movie"
            />
            {error}
        </div>
    )
}

const Input = styled.input`
    background: #FFFFFF;
    border: 1px solid rgba(31, 32, 65, 0.25);
    box-sizing: border-box;
    border-radius: 7px;
    padding: 12px;
    min-width: 20vw;
`;

export default Search;
