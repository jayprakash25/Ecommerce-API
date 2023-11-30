const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  zip: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
});

// userSchema.virtual("id").get(() => {
//   return this._id.toHexString();
// });

// userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("Users", userSchema);

module.exports = { User, userSchema };
