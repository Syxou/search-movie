import React from 'react';
import styled from 'styled-components';

interface CardPoster {
    poster: string,
}

interface CardProps extends CardPoster {
    id?: string,
    title: string,
    year: string,
}

const Card: React.FC<CardProps> = ({
    id,
    title,
    year,
    poster,
    ...rest
}) => {
    return (
        <CardWrap
            {...rest}
            poster={poster}
        >
            <h3>{title}</h3>
            <p>{year}</p>

        </CardWrap>
    )
}

const CardWrap = styled.article<CardPoster>`
    background: linear-gradient(360deg, #1F2041 0%, rgba(31, 32, 65, 0) 100%),url(${props => props.poster ? props.poster : ''});
    border-radius: 7px;
    padding: 140px 40px 40px 40px;
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

export default Card;
