import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Icon } from '../../assets/favorite.svg';
import { Favorites as IFavorites } from '../../slice/moviesSlice';

interface CardPoster {
    poster: string,
}

interface CardProps extends CardPoster {
    imdbID: string,
    title: string,
    year: string,
    onClickFollow?: (item: IFavorites) => void,
}

const Card: React.FC<CardProps> = ({
    imdbID,
    title,
    year,
    poster,
    onClickFollow,
    ...rest
}) => {
    return (
        <CardWrap
            {...rest}
            poster={poster}
        >
            <CardContent>
                <h3>{title}</h3>
                <p>{year}</p>
                <Favorites onClick={() => onClickFollow
                    ? onClickFollow({ imdbID, title, year, poster } as IFavorites)
                    : null}
                >
                    <Icon />
                </Favorites>
            </CardContent>
        </CardWrap>
    )
}

const Favorites = styled.button`
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

    & > svg{
        fill:#BC9CFF;
    }
`;

const CardWrap = styled.article<CardPoster>`
    display: flex;
    align-items: flex-end;
    background: linear-gradient(360deg, #1F2041 0%, rgba(31, 32, 65, 0) 100%),url(${props => props.poster ? props.poster : ''});
    border-radius: 7px;
    padding: 140px 40px 60px 40px;
    box-shadow: 0px 5px 15px rgba(31, 32, 65, 0.15);

    h3{
        font-style: normal;
        font-weight: bold;
        font-size: 19px;
        line-height: 24px;
        color: #FFFFFF;
        margin: 0;
    }

    p{
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.75);
        margin: 0;
    }
`;

const CardContent = styled.div`

`;

export default Card;
