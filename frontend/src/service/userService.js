import axios from "axios";

const API = 'http://localhost:3002/api/user'

export const postForm = async (data) => {
    const res = await axios.post(`${API}`, data)
    return res.data;
}

export const getUser = async () => {
    const res = await axios.get(`${API}`)
    return res.data;
}