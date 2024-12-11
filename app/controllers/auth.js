import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

/**
 * @route POST /auth/register
 * @desc Registers a user
 * @access Public
 */
export async function Register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("register", {
            title: "Growth Phoenix Website",
            errors: errors.array(),
            oldInput: req.body,
        });
    }

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({
                status: "failed",
                message: "It seems you already have an account, please log in instead.",
            });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        const { role, ...user_data } = savedUser._doc;

        res.render("login", { 
            title: "Login", 
            message: "Thank you for registering! Please log in to continue." 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal Server Error",
        });
    }
}

export async function Login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("login", {
            title: "Login",
            errors: errors.array(),
            oldInput: req.body,
        });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: "User not found. Please register.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: "failed",
                message: "Incorrect password.",
            });
        }

        req.session.user = user; // Example with sessions
        res.redirect("/dashboard"); // Redirect to the user's dashboard or home page
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal Server Error",
        });
    }
}

/**
 * Log out the user
 */
export function Logout(req, res) {
    // Destroy session or clear auth tokens
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Could not log out, please try again later.",
            });
        }

        res.redirect("/login"); // Redirect to login after logout
    });
}
