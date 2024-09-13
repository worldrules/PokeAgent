/* eslint-disable @typescript-eslint/no-unused-vars */
import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        //HASH HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });
        if (newUser) {
            await generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(500).json({ message: 'Failed to create user' });
        }

    } catch (error) {
        console.log('Error in signup: ', error.message);
        res.status(500).json({ message: error.message });
    }
};


export const login = (req, res) => {
    console.log('loginUser');
};

export const logout = (req, res) => {
    console.log('logoutUser');
};