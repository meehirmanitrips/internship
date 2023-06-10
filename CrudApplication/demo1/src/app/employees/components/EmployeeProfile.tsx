import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import {getEmployee} from '../services/api'

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

export function EmployeeProfile() {
  // Defining the state for the employee
  const [employee, setEmployee] = useState(defaultValue)

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

  const editEmployeeDetails = () => {
    navigate(`/edit-employee/${id}`)
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
          readOnly
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
          readOnly
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
          readOnly
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
          readOnly
        />
      </div>
      <div className='mb-10'>
        <label className='form-label'>Country</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your Salary'
          name='country'
          value={employee.country}
          readOnly
        />
      </div>
      <div className='mb-10'>
        <label className='form-label'>State</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your Salary'
          name='state'
          value={employee.state}
          readOnly
        />
      </div>
      <div className='mb-10'>
        <label className='form-label'>City</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your Salary'
          name='city'
          value={employee.city}
          readOnly
        />
      </div>
      <button className='btn btn-primary' onClick={() => editEmployeeDetails()}>
        Edit Profile
      </button>
    </>
  )
}
