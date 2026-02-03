import axios from 'axios'

export const placeOrder=async(orderData)=>{
    const response=await axios.post(
        'http://localhost:4000/api/order/add',
        orderData
    )
    return response.data
}