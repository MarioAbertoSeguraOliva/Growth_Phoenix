import express from 'express';
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.session.user) next();
  next('/auth/login'); 
};

export default isAuthenticated;