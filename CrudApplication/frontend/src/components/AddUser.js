import {
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../service/api";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 5% auto;
  & > div {
    margin-top: 20px;
  }
`;

const defaultValue = {
  name: "",
  age: "",
  email: "",
  salary: "",
  country: "",
  state: "",
  city: "",
};

const AddUser = () => {
  const [employee, setEmployee] = useState(defaultValue);

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    console.log(employee);
  };

  const addEmployeeDetails = async () => {
    await addEmployee(employee);
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h4">Add Employee</Typography>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="name" />
      </FormControl>
      <FormControl>
        <InputLabel>Age</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="age" />
      </FormControl>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="email" />
      </FormControl>
      <FormControl>
        <InputLabel>Salary</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="salary" />
      </FormControl>
      <FormControl>
        <InputLabel>Country</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="country" />
      </FormControl>
      <FormControl>
        <InputLabel>State</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="state" />
      </FormControl>
      <FormControl>
        <InputLabel>City</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="city" />
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={() => addEmployeeDetails()}>
          Add Employee
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddUser;
