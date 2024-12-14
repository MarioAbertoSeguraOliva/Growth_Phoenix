import session from 'express-session';

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  name: "sessionID",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60, // 1 hour
  },
});

export default sessionConfig;