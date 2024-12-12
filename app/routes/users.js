import { Router } from "express";
import { User } from "../models/User.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.render("users", { title: "Users", users, messages: req.flash() });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users");
  }
});

router.post("/add", async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = new User({ email, password });
    await newUser.save();
    console.log("User added:", newUser);
    res.redirect("/users");
  } catch (err) {
    console.log(req.body);
    console.error("Error adding user:", err);
    res.redirect("/users");
  }
});

export default router;
