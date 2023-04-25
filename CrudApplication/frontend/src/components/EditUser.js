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

import { Country, State, City } from "country-state-city";
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

  // Define the states for the dropdown menus
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // Define the options for the dropdown menus
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cityOptions = selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    : [];

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

  // Define the change handlers for the dropdown menus
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    const val = Country.getCountryByCode(event.target.value);
    setSelectedState("");
    setSelectedCity("");
    setEmployee({ ...employee, country: val.name });
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    const val = State.getStateByCodeAndCountry(
      event.target.value,
      selectedCountry
    );
    setSelectedCity("");
    setEmployee({ ...employee, state: val.name });
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setEmployee({ ...employee, city: event.target.value });
  };

  return (
    <>
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
        {/* <FormControl>
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
        </FormControl> */}

        <div>
          <label htmlFor="country-select">Country:</label>
          <select
            id="country-select"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select a country</option>
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {selectedCountry && (
            <div>
              <label htmlFor="state-select">State:</label>
              <select
                id="state-select"
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="">Select a state</option>
                {stateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedState && (
            <div>
              <label htmlFor="city-select">City:</label>
              <select
                id="city-select"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">Select a city</option>
                {cityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <FormControl>
          <Button variant="contained" onClick={() => editEmployeeDetails()}>
            Edit Employee
          </Button>
        </FormControl>
      </Container>
    </>
  );
};

export default EditUser;
