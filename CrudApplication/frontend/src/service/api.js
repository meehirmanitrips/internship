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
