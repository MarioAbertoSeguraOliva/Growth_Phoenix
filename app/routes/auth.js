import { Router } from "express";
import { check } from "express-validator";
import { Register, Login, Logout } from "../controllers/auth.js";

const router = Router();

router.post(
  "/register",
  [
    check("email")
      .isEmail()
      .withMessage("Enter a valid email address")
      .normalizeEmail(),
    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  Register
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  Login
);

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Growth Phoenix Website",
    errors: [],
    oldInput: {},
    messages: req.flash()
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    messages: req.flash()
  });
});

router.post("/logout", Logout);

export default router;
