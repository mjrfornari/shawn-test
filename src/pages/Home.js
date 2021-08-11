import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import api from '../services/api'

import './styles/Home.css';

function Home() {
    const [data, setData] = useState([])
    const [lastSince, setLastSince] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            setData(await api.getUsers(0))
        }
 
        fetchData()
    }, [])

    const mapItems = (item, index) => {
        return (
            <Link 
                to={{
                    pathname: "/user",
                    search: "?login="+item.login,
                }} 
                className="Home__link"
            >
                <ListGroupItem className="Home__user-item">
                    <div className="user-item__avatar">
                        <img className="avatar" src={item.avatar_url} alt={item.login+'_avatar'}></img>
                    </div>
                    <div className="user-item__data">
                        <span>Id: {item.id}</span>
                        <span>Login: {item.login}</span>
                    </div> 
                </ListGroupItem>
            </Link>
        )
    }

    const handleNextPage = async (e) => {
        e.preventDefault()
        setLastSince(data[0].id)
        setData(await api.getUsers((data[data.length-1].id)))
    }

    const handlePrevPage = async (e) => {
        e.preventDefault()
        setData(await api.getUsers(lastSince))
    }

    let listedItems = data.map(mapItems)

    return (
        <div className="page--content">
            <div className="Home">
                <h2>GitHub users list</h2>
                <div className="Home__users-list">
                    <ListGroup>
                        {listedItems}
                    </ListGroup>
                </div>
                <div className="Home__pagination">
                    <button onClick={handlePrevPage}>{'<'}</button>
                    <button onClick={handleNextPage}>{'>'}</button>
                    
                </div>
            </div>
        </div>
    );
}

export default Home;
