import { mongoose } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: "Your email is required", unique: true, lowercase: true, trim: true, },
  password: { type: String, required: "Your password is required", max: 25 },
  role: {type: String, required: true, default: "0x01"},
}, { timestamps: true }); 

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return next(err);

          user.password = hash;
          next();
      });
  });
});

export const User = mongoose.model('User', userSchema);
