import React, { useEffect, useState } from 'react';

import api from '../services/api'

import './styles/User.css';

function User() {
    const [user, setUser] = useState({})
    const [lastSince, setLastSince] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const query = new URLSearchParams(window.location.search);
            if (query.get('login')) setUser(await api.getUser(query.get('login')))
            else setUser({ login: 'no user found' })
        }
 
        fetchData()
    }, [])


    return (
        <div className="page--content">
            <div className="User">
                <div className="User__user-data">
                    <div className="user-data">
                        <img className="avatar" src={user.avatar_url} alt={user.login+'_avatar'}></img>
                        <span>Id: {user.id}</span>
                        <span>Login: {user.login}</span>
                        <span>Profile URL: <a href={user.html_url} target='_blank' rel="noreferrer">Click here</a></span>
                        <span>Created At: {new Date(user.created_at).toLocaleDateString()}</span>
                    </div> 
                    <button className="backButton">Back</button>
                </div>
            </div>
        </div>
    );
}

export default User;
