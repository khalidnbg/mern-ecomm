const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },

    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add valid email",
      ],
    },

    password: {
      type: String,
      resuired: [true, "Please enter your password"],
      minLength: [6, "Password must be at least 6 characters"],
    },

    role: {
      type: String,
      required: [true],
      default: "customer",
      enum: ["customer", "admin"],
    },

    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDnDk1/avatar.png",
    },

    phone: {
      type: String,
      default: "+000 000 ...",
    },

    address: { type: Object },
  },
  {
    timestamps: true,
  }
);

// Hash paswword before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // hash paswword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
