import axios from 'axios'

const API=axios.create({
    baseURL:"http://localhost:4000/"
})

export const getCustomerProfile=()=>{
    const token=localStorage.getItem('token')
    return API.get('/api/customer/profile',{
        headers:{token}
    }).then(res=>res.data)
}