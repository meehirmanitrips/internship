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
