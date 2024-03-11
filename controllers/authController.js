import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// import users from "../models/auth.js";



export const authLogin = async (req,res) => {
    const {email, password} = req.body;
}

export const authLogout = async (req, res) => {
    
}

export const getUsers = async (req, res) => {
    let user = {
        "dasasas":"sassasas"
    };
    res.status(200).json({ data: users });
}

