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
    if (errors.errors.find((err) => err.path === "email"))
      req.flash("error", "Invalid email address. Please try again.");

    return res.render("register", {
      title: "Register",
      errors: errors.array(),
      oldInput: req.body,
      messages: req.flash(),
    });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "This username was already taken");
      return res.redirect("back");
    }

    const sanitizedPassword = password.trim();

    const newUser = new User({
      email,
      password: sanitizedPassword,
    });

    const savedUser = await newUser.save();
    const { role, ...user_data } = savedUser._doc;

    req.flash("success", "You have been successfully registered! Please log in.");
    res.redirect("/auth/login");
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
      messages: req.flash(),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "User not found. Please register");
      return res.redirect("/auth/login");
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      req.flash("error", "Incorrect password.");
      return res.redirect("/auth/login");
    }

    req.flash("success", "Welcome back!");
    req.session.user = user;
    console.log(req.session);

    return res.render("dashboard", {
      title: "Dashboard",
      errors: errors.array(),
      messages: req.flash(),
      user: req.session.user,
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

/**
 * Log out the user
 */
export function Logout(req, res) {
  req.flash("success", "You have been logged out successfully.");

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Could not log out, please try again later.",
      });
    }

    res.redirect("/");
  });
}
