import React from 'react'
import {useNavigate, Link} from 'react-router-dom'
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
    fontWeight: 'Bold',
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

  function findObjectIndexByUsername(array: any = true, username: any = true) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].username === username) {
        return i // Return the index if username is found
      }
    }
    return -1 // Return -1 if username is not found
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
    // navigate('/employee-page')
    response = await getEmployees()
    const dataNew = response.data
    const index = findObjectIndexByUsername(dataNew, username)
    if (index !== -1) {
      const id = dataNew[index]._id
      navigate(`/employee-profile/${id}`)
    }
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
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-3'>Sign Up</h1>
        {/* end::Title */}

        <div className='text-gray-500 fw-semibold fs-6'>Your Social Campaigns</div>
      </div>
      {/* end::Heading */}

      <div className='separator separator-content my-14'>
        <span className='w-125px text-gray-500 fw-semibold fs-7'>Sign Up As Employee</span>
      </div>

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
        <label className='form-label fw-bolder text-dark fs-6'>Name</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your Name'
          name='name'
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <div className='mb-10'>
        <label className='form-label fw-bolder text-dark fs-6'>Username</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your Username'
          name='username'
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <div className='mb-10'>
        <label className='form-label fw-bolder text-dark fs-6'>Password</label>
        <input
          type='password'
          className='form-control form-control-white'
          placeholder='Enter Your Password'
          name='password'
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <div className='mb-10'>
        <label className='form-label fw-bolder text-dark fs-6'>Age</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your Age'
          name='age'
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <div className='mb-10'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          type='email'
          className='form-control form-control-white'
          placeholder='Enter Your Email'
          name='email'
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <div className='mb-10'>
        <label className='form-label fw-bolder text-dark fs-6'>Salary</label>
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
      <br></br>
      <div className='d-grid mb-10'>
        <button className='btn btn-primary' onClick={() => addEmployeeDetails()}>
          Sign Up
        </button>
      </div>
      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Already Have an Account?{' '}
        <Link to='/login' className='link-primary'>
          Sign In
        </Link>
      </div>
    </>
  )
}
