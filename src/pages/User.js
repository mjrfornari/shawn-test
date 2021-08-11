import React, { useEffect, useState, useRef } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useIntersectionObserver } from 'ax-react-lib';

import api from '../services/api'

import './styles/User.css';

function User() {
    const [user, setUser] = useState({})
    const [repos, setRepos] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
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
        const appendRepos = async () => {
            if (!lastPage) {
                let nextPage = currentPage + 1
                let appendRepos = await api.getUserRepos(user.login, nextPage, setLastPage)
                const appendedRepos = [...repos].concat(appendRepos) 
                setRepos(appendedRepos)
                setCurrentPage(nextPage)
            }
        }

        if (isBottomVisible) {
            appendRepos()
        }
    }, [isBottomVisible]);

    useEffect(() => {
        const fetchData = async () => {
            const query = new URLSearchParams(window.location.search);
            if (query.get('login')) {
                setUser(await api.getUser(query.get('login')))
                setRepos(await api.getUserRepos(query.get('login'), currentPage))
            }
            else setUser({ login: 'no user found' })
        }
 
        fetchData()
    }, [])

    const handleBack = (e) => {
        e.preventDefault()
        window.history.back()
    }

    const mapItems = (item, index) => {
        return (
            <ListGroupItem className="User__repo-item">
                <a href={item.html_url} target="_blank" rel="noreferrer">
                    <div className="repo-item__data">
                        <span>{item.id} | {item.name}</span>
                    </div> 
                </a>
            </ListGroupItem>
        )
    }


    let listedItems = repos.map(mapItems)

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
                        <ListGroup className="User__repos-list">   
                            {listedItems}
                            <div style={{ height: '1px' }} ref={ref}/>
                        </ListGroup>
                    </div> 
                    <button className="backButton" onClick={handleBack}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default User;
