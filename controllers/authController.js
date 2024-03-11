import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/auth.js";



export const authLogin = async (req,res) => {
    const {email, password} = req.body;
    try {
      if(!email && !password){
        return res.status(404).json({ message: "All fields are required" });
      }
      const oldUser = users.find((u) => u.email === email);;

      if (!oldUser)
        return res.status(404).json({ message: "User doesn't exist" });

      const isPasswordCorrect = password !== oldUser.password;
      

      if (password !== oldUser.password)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { email: oldUser.email, role:oldUser.role , id: oldUser.id },
        "secret",
        { expiresIn: "1h" }
      );

      res.status(200).json({ user: oldUser, token: token });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }

}

export const authLogout = async (req, res) => {
    res.status(200).json({ message: "clear user session" });
}

export const getUsers = async (req, res) => {
    res.status(200).json({ data: users });
}

