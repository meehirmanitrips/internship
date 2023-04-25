import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const employeeSchema = mongoose.Schema({
  name: String,
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

const employee = mongoose.model("employee", employeeSchema);

export default employee;
