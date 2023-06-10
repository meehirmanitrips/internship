import React from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {useState} from 'react'

import {getEmployees, loginEmployee} from '../services/api'

const defaultValue = {
  username: '',
  password: '',
}

export function LoginPage() {
  // Defining the state for the employee
  const [employee, setEmployee] = useState(defaultValue)

  // Defining the state for the focus on the input
  const [isFocused, setIsFocused] = useState(false)
  const [isFocusedPass, setIsFocusedPass] = useState(false)

  // Defining the state for the alert if email is not unique
  const [messageUsername, setMessageUsername] = useState('')

  const navigate = useNavigate()

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

  const logEmployeeDetails = async () => {
    setMessageUsername('')
    const {username} = employee
    let response: any = true
    response = await getEmployees()
    const data = response.data
    if (data.find((ele: any = true) => ele.username === username)) {
      const index = findObjectIndexByUsername(data, username)
      if (index !== -1) {
        const id = data[index]._id
        setTimeout(function () {
          setMessageUsername('Username or Password is invalid')
        }, 1000)
        await loginEmployee(employee)
        navigate(`/employee-profile/${id}`)
        return
      }
    }
    setMessageUsername('Username or Password is invalid')
  }

  // Handling Styling
  const handleFocus = () => {
    setIsFocused(true)
  }
  const handleFocusPass = () => {
    setIsFocusedPass(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }
  const handleBlurPass = () => {
    setIsFocusedPass(false)
  }

  const inputStyles = {
    border: isFocused ? '2px solid green' : 'none',
  }
  const inputStylesPass = {
    border: isFocusedPass ? '2px solid green' : 'none',
  }

  return (
    <>
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
        <div className='text-gray-500 fw-semibold fs-6'>Your Social Campaigns</div>
      </div>
      {/* begin::Heading */}

      {/* begin::Separator */}
      <div className='separator separator-content my-14'>
        <span className='w-125px text-gray-500 fw-semibold fs-7'>Sign In As Employee</span>
      </div>
      {/* end::Separator */}

      {messageUsername && (
        <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
          <span className='svg-icon svg-icon-2hx svg-icon-primary me-3'>...</span>

          <div className='d-flex flex-column'>
            <h5 className='mb-1'>Invalid Username or Password</h5>
            <span>{messageUsername}</span>
          </div>
        </div>
      )}
      <div className='mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Username</label>
        <input
          type='text'
          className='form-control form-control-white'
          placeholder='Enter Your Username'
          name='username'
          style={inputStyles}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
          style={inputStylesPass}
          onFocus={handleFocusPass}
          onBlur={handleBlurPass}
          onChange={(e) => onValueChange(e)}
        />
      </div>
      <div className='d-grid mb-10'>
        <button className='btn btn-primary' onClick={() => logEmployeeDetails()}>
          Sign In
        </button>
      </div>
      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/signup' className='link-primary'>
          Sign up
        </Link>
      </div>
    </>
  )
}
