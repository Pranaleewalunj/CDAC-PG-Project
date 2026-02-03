import axios from 'axios'

const instance=axios.create({
    baseURL:'http://localhost:4000/api'
})

instance.interceptors.request.use(config=>{
    const token=localStorage.getItem('token')
    if(token &&
        !config.url.includes('/signin')&&
        !config.url.includes('/register')
        ) {
        config.headers['Authorization']=`Bearer ${token}`
    }
    return config
})

export default instance