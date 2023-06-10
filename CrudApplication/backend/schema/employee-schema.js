import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import bcrypt from "bcryptjs";

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  age: {
    type: String,
    validate: function (val) {
      return val > 10;
    },
    message: "Age must be above 10 to register",
  },
  email: {
    type: String,
    unique: true,
  },
  salary: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

autoIncrement.initialize(mongoose.connection);
employeeSchema.plugin(autoIncrement.plugin, "employee");

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

employeeSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const employee = mongoose.model("employee", employeeSchema);

export default employee;
