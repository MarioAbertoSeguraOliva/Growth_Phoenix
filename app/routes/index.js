import express from "express";
const router = express.Router();
import isAuthenticated from "../middlewares/BasicAuth.js";

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Growth Phoenix Website",
    messages: req.flash(),
  });
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  // Example data to pass to the dashboard
  const dashboardData = {
    title: 'User Dashboard',
    userMail: req.user.email,  // Assuming `req.user` contains user data
    notifications: 5,
    messages: 3,
  };

  res.render('dashboard', dashboardData);  // Render dashboard.ejs
});

export default router;
