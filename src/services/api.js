import axios from 'axios'

const githubApiUrl = 'https://api.github.com'

const api = axios.create({
    baseURL: githubApiUrl
});

api.test = () => {
    return new Promise(async (resolve, reject) => {
        api.get('/zen').then(response => {
            if (response.status === 200) resolve(response.data)
            else reject(response.statusText)
        }).catch((error) => reject(error))
    })
}

api.getUsers = async (link) => {
    return new Promise(async (resolve, reject) => {
        if (link) console.log(link.split(githubApiUrl).pop())
        let reqURL = (link ? link.split(githubApiUrl).pop() : '/users')
        api.get(reqURL).then(response => {
            console.log(response.headers.link)
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

api.getUserProjects = async (userId) => {
    return new Promise(async (resolve, reject) => {
        api.get('/zen').then(response => {
            if (response.status === 200) resolve(response.data)
            else reject(response.statusText)
        }).catch((error) => reject(error))
    })
}


export default api