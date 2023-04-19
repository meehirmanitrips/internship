import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const employeeSchema = mongoose.Schema({
  name: String,
  age: String,
  email: String,
  salary: String,
  country: String,
  state: String,
  city: String,
});

autoIncrement.initialize(mongoose.connection);
employeeSchema.plugin(autoIncrement.plugin, "employee");

const employee = mongoose.model("employee", employeeSchema);

export default employee;
