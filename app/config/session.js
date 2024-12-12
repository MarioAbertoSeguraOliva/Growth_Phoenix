import session from 'express-session';

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  name: "sessionID",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
  },
});

export default sessionConfig;