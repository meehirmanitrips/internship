import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import {Country, State, City} from 'country-state-city'
import {editEmployee, getEmployee} from '../services/api'

// Setting the default value for the employee data
const defaultValue = {
  name: '',
  age: '',
  email: '',
  salary: '',
  country: '',
  state: '',
  city: '',
}

const styles = {
  container: {
    // width: '100%',
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

export function EditEmployee() {
  // Defining the state for the employee
  const [employee, setEmployee] = useState(defaultValue)

  // Define the states for the dropdown menus
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadEmployeeDetails()
    // eslint-disable-next-line
  }, [])

  const loadEmployeeDetails = async () => {
    const response: any = await getEmployee(id)
    setEmployee(response.data)
  }

  // Defining the function for when the value changes
  const onValueChange = (e: any = true) => {
    setEmployee({...employee, [e.target.name]: e.target.value})
    console.log(employee)
  }

  const editEmployeeDetails = async () => {
    if (Number(employee.age) < 10) {
      alert('Age cannot be less than 10')
      return
    }
    await editEmployee(employee, id)
    navigate('/employee-page')
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
      <div className='mb-10'>
        <label className='form-label'>Name</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your Name'
          name='name'
          value={employee.name}
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
          value={employee.age}
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
          value={employee.email}
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
          value={employee.salary}
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
      <button className='btn btn-primary' onClick={() => editEmployeeDetails()}>
        Edit Employee
      </button>
    </>
  )
}
