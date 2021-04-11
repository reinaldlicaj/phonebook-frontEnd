import axios from "axios";
import User from "../entities/User";

const BASE_URL = "http://localhost:3000/users";

export const getAllUsers = async (pageNumber = 1, size = 10, sort = 1) => {
    try {
        const response = await axios.get(BASE_URL + `?page=${pageNumber}&size=${size}&sort=${sort}`);
        if (response.status === 201) return console.log("Something went wrong");
        const users = response.data.data.map((user) => {
            return new User(user._id, user.firstName, user.lastName, user.numbers);
        });
        return users;
    } catch (err) {
        console.log(err.message);
    }
};

export const createUser = async (user) => {
    try {
        const response =  await axios.post(BASE_URL, user);
        return response.data.id
    } catch (err) {
        console.log(err.message);
    }
};

export const updateUser = async (user) => {
    try {
        await axios.put(`${BASE_URL}/${user.id}`, user);
    } catch (err) {
        console.log(err.message);
    }
};

export const deleteUser = async (user) => {
    try {
        await axios.delete(`${BASE_URL}/${user.id}`);
    } catch (err) {
        console.log(err.message);
    }
};
