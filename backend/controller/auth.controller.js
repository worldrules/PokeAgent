/* eslint-disable @typescript-eslint/no-unused-vars */
import User from "../model/user.model.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await User.findOne({ username });
    } catch (error) {

    }
};


export const login = (req, res) => {
    console.log('loginUser');
};

export const logout = (req, res) => {
    console.log('logoutUser');
};