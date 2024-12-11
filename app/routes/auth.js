import { Register } from "../controllers/auth.js";
import Validate from "../middlewares/validate.js";
import { check } from "express-validator";
import { Router } from 'express';

const router = Router();

// Register route -- POST request
router.post(
    "/register",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Must be at least 8 chars long"),
    Validate,
    Register
);

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Growth Phoenix Website' });
});

export default router;