import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Bad Request"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User Already Exists"
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashpassword
        });

        return res.status(201).json({
            message: "User registered Successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "Bad request"
            })
        }

        const existUser = await User.findOne({ email })



        if (!existUser) {
            return res.status(401).json({
                message: "User doesn't exist"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, existUser.password)

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign(
            { userId: existUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        )

        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: existUser._id,
                name: existUser.name,
                email: existUser.email
            }
        })


    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    try {


        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name },
            {
                new: true, runValidators: true
            }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            message: "User updated successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    signup,
    login,
    updateUser,
};