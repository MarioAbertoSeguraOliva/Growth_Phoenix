import { mongoose } from "mongoose";
import bcrypt from "bcrypt";
import AccountStates from "../constants/accountStates.js";
import Roles from "../constants/roles.js";
import GenderChoices from "../constants/genderChoices.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: "Your email is required",
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: "Your password is required" },
    role: {
      type: String,
      required: true,
      default: Roles.GUEST,
      enum: Object.values(Roles),
    },
    username: {
      type: String,
      default: function () {
        return `user${Date.now().toString().slice(-6)}`;
      },
      trim: true,
    },
    status: {
      type: String,
      required: false,
      default: AccountStates.NEW,
      enum: Object.values(AccountStates),
    },
    dateOfBirth: { type: Date, required: false },
    gender: {
      type: String,
      enum: Object.values(GenderChoices),
      required: false,
      default: GenderChoices.PREFER_NOT_TO_SAY,
    },
    profilePhoto: {
      type: String,
      default: "/images/default-profile.png",
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format for phone numbers
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: false,
    },
    preferences: {
      theme: { type: String, default: "light" },
      language: { type: String, default: "en" },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.virtual('id').get(function (){
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

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

export const User = mongoose.model("User", userSchema);
