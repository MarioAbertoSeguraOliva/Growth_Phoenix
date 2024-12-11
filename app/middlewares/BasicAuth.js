import { express } from 'express';
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) 
    return next(); 
  
  res.redirect('/auth/login'); 
};


module.exports = isAuthenticated;