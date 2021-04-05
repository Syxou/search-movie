import React from 'react';
import styled from 'styled-components';
import LoginChoice from '../Login/LoginChoice';
import Search from '../Search/Search';


const Nav: React.FC = () => {
    return (
        <NevWrap>
            <Search />
            <LoginChoice />
        </NevWrap>
    )
}

const NevWrap = styled.nav`
    position: fixed;
    top: 0; 
    width: 100%; 
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px #E5E9F2;
    & > div{
        margin: 0 15px;
    }
`;

export default Nav;
