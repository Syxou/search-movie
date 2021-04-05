import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, clear } from '../../slice/serviceSlice';

const UserMeta: React.FC = () => {
    const dispatch = useDispatch();
    const { service } = useSelector(selectUser);

    const logOut = () => {
        dispatch(clear())
    }
    
    return (
        <div>
            <div>
                <p>{service.name}</p>
            </div>
            <button onClick={logOut}>logout</button>
        </div>
    )
}

export default UserMeta;
