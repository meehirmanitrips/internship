import axios from "axios";

const URL = "http://localhost:8000";

export const addEmployee = async (data) => {
  try {
    return await axios.post(`${URL}/add`, data);
  } catch (error) {
    console.log("Error while calling add employee api ", error);
  }
};

export const getEmployees = async () => {
  try {
    return await axios.get(`${URL}`);
  } catch (error) {
    console.log("Error while calling get employees api ", error);
  }
};

export const getEmployee = async (id) => {
  try {
    return await axios.get(`${URL}/${id}`);
  } catch (error) {
    console.log("Error while calling get employee api ", error);
  }
};

export const editEmployee = async (employee, id) => {
  try {
    return await axios.put(`${URL}/${id}`, employee);
  } catch (error) {
    console.log("Error while calling edit employee api ", error);
  }
};

export const deleteEmployee = async (id) => {
  try {
    return await axios.delete(`${URL}/${id}`);
  } catch (error) {
    console.log("Error while calling delete employee api ", error);
  }
};
