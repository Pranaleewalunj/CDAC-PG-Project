import axios from 'axios'

const deliveryAxios=axios.create({
    baseURL:"http://localhost:8080",
})
deliveryAxios.interceptors.request.use((config)=>{
    const token=localStorage.getItem("delivery_token")
    if(token){
        config.headers.Authorization="Bearer "+token
    }
    return config
})

export default deliveryAxios