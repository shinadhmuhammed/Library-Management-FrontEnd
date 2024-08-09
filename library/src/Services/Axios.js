import axios from "axios";


const createAxios = () => {
    const axiosUser = axios.create({
        baseURL: `http://localhost:3001/`,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    });
    axiosUser.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            console.log(token);
            return {
                ...config,
                headers: {
                    ...(token !== null && { Authorization: `Bearer ${token}` }),
                    ...config.headers,
                },
            };
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosUser.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            return Promise.reject(error);
        })
    return axiosUser;
}

export default createAxios