import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUser, clear } from '../../slice/serviceSlice';
import { ReactComponent as Icon } from '../../assets/logout.svg';

const UserMeta: React.FC = () => {
    const dispatch = useDispatch();
    const { service } = useSelector(selectUser);

    const logOut = () => {
        dispatch(clear())
    }

    return (
        <Meta>
            <Image src={service.picture} alt={service.email} />
            <Name>Hi, {service.name?.split(' ')[0]}</Name>
            <Button onClick={logOut}><Icon /></Button>
        </Meta>
    )
}

const Meta = styled.div`
    display: flex;
    align-items: center;
`;

const Name = styled.p`
    margin: 0 15px 0;
    font-style: normal;
    font-weight: bold;
    font-size: 19px;
    text-align: center;
    color: #1F2041;
`;

const Button = styled.button`
    background: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%);
    border-radius: 22px;
    border:none;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg{
        width: 16px;
        fill: #FFFFFF;
    }
`;

const Image = styled.img`
    width: 34px;
    height: 34px;
    background: url(image.png);
    border: 2px solid #FFFFFF;
    border-radius: 24px;
    box-shadow: 0px 0px 20px 1px rgba(31, 32, 65, 0.2);
`;

export default UserMeta;
