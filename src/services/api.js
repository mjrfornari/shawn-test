import axios from 'axios'


const api = axios.create({
    baseURL: 'https://api.github.com'
});

api.test = () => {
    return new Promise(async (resolve, reject) => {
        api.get('/zen').then(response => {
            if (response.status === 200) resolve(response.data)
            else reject(response.statusText)
        }).catch((error) => reject(error))
    })
}

api.getUsers = async (since, setLastPage) => {
    return new Promise(async (resolve, reject) => {
        api.get('/users', { params: { since }}).then(response => {
            if (response?.headers?.link?.indexOf("next") === -1) setLastPage(true)
            if (response.status === 200) resolve(response.data)
            else reject(response.statusText)
        }).catch((error) => reject(error))
    })
}

api.getUser = async (login) => {
    return new Promise(async (resolve, reject) => {
        api.get('/users/'+login).then(response => {
            if (response.status === 200) resolve(response.data)
            else reject(response.statusText)
        }).catch((error) => reject(error))
    })
}

api.getUserRepos = async (login, page, setLastPage) => {
    return new Promise(async (resolve, reject) => {
        api.get('/users/'+login+'/repos', { params: { page }}).then(response => {
            if (response?.headers?.link?.indexOf("next") === -1) setLastPage(true)
            if (response.status === 200) resolve(response.data)
            else reject(response.statusText)
        }).catch((error) => reject(error))
    })
}


export default api