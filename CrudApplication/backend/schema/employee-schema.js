import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import bcrypt from "bcryptjs";

const employeeSchema = mongoose.Schema({
  name: String,
  username: String,
  password: String,
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
  salary: String,
  country: String,
  state: String,
  city: String,
});

autoIncrement.initialize(mongoose.connection);
employeeSchema.plugin(autoIncrement.plugin, "employee");

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const employee = mongoose.model("employee", employeeSchema);

export default employee;
