import React from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import {EmployeePage} from './EmployeePage'
import {useState} from 'react'

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

export function AddEmployee() {
  // Defining the state for the employee
  const [employee, setEmployee] = useState(defaultValue)

  // Defining the function for when the value changes
  const onValueChange = (e: any = true) => {
    setEmployee({...employee, [e.target.name]: e.target.value})
    console.log(employee)
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
      <div className='mb-10'>
        <label className='form-label'>Country</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your Country'
          name='country'
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <div className='mb-10'>
        <label className='form-label'>State</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your State'
          name='state'
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <div className='mb-10'>
        <label className='form-label'>City</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your City'
          name='city'
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <Link to='/employee-page'>
        <button className='btn btn-primary'>Add Employee</button>
      </Link>

      <Routes>
        <Route path='/employee-page' element={<EmployeePage />} />
      </Routes>
    </>
  )
}
