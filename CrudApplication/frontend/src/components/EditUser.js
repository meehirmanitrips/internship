import {
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editEmployee, getEmployee } from "../service/api";

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

const EditUser = () => {
  const [employee, setEmployee] = useState(defaultValue);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadEmployeeDetails();
  }, []);

  const loadEmployeeDetails = async () => {
    const response = await getEmployee(id);
    setEmployee(response.data);
  };

  const onValueChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    console.log(employee);
  };

  const editEmployeeDetails = async () => {
    await editEmployee(employee, id);
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h4">Edit Employee</Typography>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={employee.name}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Age</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="age"
          value={employee.age}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={employee.email}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Salary</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="salary"
          value={employee.salary}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Country</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="country"
          value={employee.country}
        />
      </FormControl>
      <FormControl>
        <InputLabel>State</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="state"
          value={employee.state}
        />
      </FormControl>
      <FormControl>
        <InputLabel>City</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="city"
          value={employee.city}
        />
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={() => editEmployeeDetails()}>
          Edit Employee
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditUser;
