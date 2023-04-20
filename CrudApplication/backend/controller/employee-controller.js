import Employee from "../schema/employee-schema.js";

export const addEmployee = async (request, response) => {
  const employee = request.body;
  const newEmployee = new Employee(employee);

  try {
    await newEmployee.save();
    response.status(201).json(newEmployee);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const getEmployees = async (request, response) => {
  try {
    const employees = await Employee.find({});
    response.status(200).json(employees);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getEmployee = async (request, response) => {
  try {
    const employee = await Employee.findById(request.params.id);
    response.status(200).json(employee);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const editEmployee = async (request, response) => {
  let employee = request.body;
  const newEmployee = new Employee(employee);

  try {
    await Employee.updateOne({ _id: request.params.id }, newEmployee);
    response.status(201).json(newEmployee);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const deleteEmployee = async (request, response) => {
  try {
    await Employee.deleteOne({ _id: request.params.id });
    response.status(200).json({ message: "Employee deleted sucessfully" });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
