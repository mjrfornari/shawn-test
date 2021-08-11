import React, { useEffect, useState, useRef } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from 'ax-react-lib';

import api from '../services/api'

import './styles/Home.css';

function Home() {
    const [data, setData] = useState([])
    const [lastPage, setLastPage] = useState(false)
    const ref = useRef(null)

    const isBottomVisible = useIntersectionObserver(
        ref,
        {
          threshold: 0
        },
        false
    );

    useEffect(() => {
        const appendData = async () => {
            if (!lastPage) {
                let appendData = await api.getUsers(data[data.length-1]?.id || 0, setLastPage)
                const appendedData = [...data].concat(appendData) 
                setData(appendedData)
            }
        }

        if (isBottomVisible) {
            appendData()
        }
    }, [isBottomVisible]);

    const mapItems = (item, index) => {
        return (
            <Link 
                to={{
                    pathname: "/user",
                    search: "?login="+item.login,
                }} 
                className="Home__link"
                key={item.id}
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

    let listedItems = data.map(mapItems)

    return (
        <div className="page--content">
            <div className="Home">
                <h2>GitHub users list</h2>
                <div className="Home__users-list">
                    <ListGroup>
                        {listedItems}
                    </ListGroup>
                    <div style={{ height: '1px' }} ref={ref}/>
                </div>
            </div>
        </div>
    );
}

export default Home;
