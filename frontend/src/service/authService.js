import axios from 'axios'

const API = "http://localhost:3002/api/auth"

export const register = async (data) => {
    const res = await axios.post(`${API}/register`, data)
    return res.data;
}

export const login = async (data) => {
    const res = await axios.post(`${API}/login`, data)
    return res.data;
}

export const verfifyEmail = async (token) => {
    const res = await axios.get(`${API}/verify/${token}`)
    return res.data
}



