import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

import {Country, State, City} from 'country-state-city'
import {getEmployees, signupEmployee} from '../services/api'

// Setting the default value for the employee data
const defaultValue = {
  name: '',
  username: '',
  password: '',
  age: '',
  email: '',
  salary: '',
  country: '',
  state: '',
  city: '',
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100vw',
    margin: 0,
  },
  label: {
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
  },
  select: {
    margin: '10px',
    padding: '5px',
  },
}

export function SignupPage() {
  // Defining the state for the employee
  const [employee, setEmployee] = useState(defaultValue)

  // Defining the state for the alert if email is not unique
  const [messageEmail, setMessageEmail] = useState('')

  // Defining the state for the alert if email is not unique
  const [messageUsername, setMessageUsername] = useState('')

  // Defining the state for the alert if age is less than 10
  const [messageAge, setMessageAge] = useState('')

  // Define the states for the dropdown menus
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const navigate = useNavigate()

  // Defining the function for when the value changes
  const onValueChange = (e: any = true) => {
    setEmployee({...employee, [e.target.name]: e.target.value})
    console.log(employee)
  }

  // Defining the function to alert the user whenever the username is not unique.
  const checkUsernameUnique = async () => {
    const {username} = employee
    let response: any = true
    response = await getEmployees()
    const data = response.data
    console.log(data)
    if (data.find((ele: any = true) => ele.username === username)) {
      setMessageUsername(`${username} is already taken.`)
      return
    }
    setMessageEmail('')
    setMessageUsername('')
    await signupEmployee(employee)
    navigate('/employee-page')
  }

  // Defining the function to alert the user whenever the email is not unique.
  const checkEmailUnique = async () => {
    const {email} = employee
    let response: any = true
    response = await getEmployees()
    const data = response.data
    console.log(data)
    if (data.find((ele: any = true) => ele.email === email)) {
      setMessageEmail(`${email} already exists in the database`)
      return
    }
  }

  // Defining the function to add the employee details
  const addEmployeeDetails = () => {
    if (Number(employee.age) < 10) {
      setMessageAge('Age cannot be less than 10')
      return
    }
    if (Number(employee.age) >= 10) {
      setMessageAge('')
    }
    checkEmailUnique()
    checkUsernameUnique()
  }

  // Define the options for the dropdown menus
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }))

  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : []

  const cityOptions = selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    : []

  // Define the change handlers for the dropdown menus
  const handleCountryChange = (event: any = true) => {
    setSelectedCountry(event.target.value)
    const val: any = Country.getCountryByCode(event.target.value)
    setSelectedState('')
    setSelectedCity('')
    setEmployee({...employee, country: val.name})
  }

  const handleStateChange = (event: any = true) => {
    setSelectedState(event.target.value)
    const val: any = State.getStateByCodeAndCountry(event.target.value, selectedCountry)
    setSelectedCity('')
    setEmployee({...employee, state: val.name})
  }

  const handleCityChange = (event: any = true) => {
    setSelectedCity(event.target.value)
    setEmployee({...employee, city: event.target.value})
  }

  return (
    <>
      {messageAge && (
        <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
          <span className='svg-icon svg-icon-2hx svg-icon-primary me-3'>...</span>

          <div className='d-flex flex-column'>
            <h5 className='mb-1'>Age not valid</h5>
            <span>{messageAge}</span>
          </div>
        </div>
      )}
      {messageEmail && (
        <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
          <span className='svg-icon svg-icon-2hx svg-icon-primary me-3'>...</span>

          <div className='d-flex flex-column'>
            <h5 className='mb-1'>Email must be unique</h5>
            <span>{messageEmail}</span>
          </div>
        </div>
      )}
      {messageUsername && (
        <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
          <span className='svg-icon svg-icon-2hx svg-icon-primary me-3'>...</span>

          <div className='d-flex flex-column'>
            <h5 className='mb-1'>Username must be unique</h5>
            <span>{messageUsername}</span>
          </div>
        </div>
      )}
      <div className='mb-10'>
        <label className='form-label'>Name</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your Name'
          name='name'
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <div className='mb-10'>
        <label className='form-label'>Username</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your Username'
          name='username'
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <div className='mb-10'>
        <label className='form-label'>Password</label>
        <input
          type='password'
          className='form-control form-control-white'
          placeholder='Enter Your Password'
          name='password'
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <div className='mb-10'>
        <label className='form-label'>Age</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your Age'
          name='age'
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <div className='mb-10'>
        <label className='form-label'>Email</label>
        <input
          type='email'
          className='form-control form-control-white'
          placeholder='Enter Your Email'
          name='email'
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <div className='mb-10'>
        <label className='form-label'>Salary</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your Salary'
          name='salary'
          onChange={(e) => onValueChange(e)}
        />
      </div>

      <div style={styles.container}>
        <label htmlFor='country-select' style={styles.label}>
          Country:
        </label>
        <select
          id='country-select'
          style={styles.select}
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value=''>Select a country</option>
          {countryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {selectedCountry && (
          <div>
            <label htmlFor='state-select' style={styles.label}>
              State:
            </label>
            <select
              id='state-select'
              style={styles.select}
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value=''>Select a state</option>
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
            <label htmlFor='city-select' style={styles.label}>
              City:
            </label>
            <select
              id='city-select'
              style={styles.select}
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value=''>Select a city</option>
              {cityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <button className='btn btn-primary' onClick={() => addEmployeeDetails()}>
        Register
      </button>
    </>
  )
}
