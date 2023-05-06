import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {getEmployees, deleteEmployee} from '../services/api'

export function EmployeePage() {
  const [employees, setEmployees] = useState([])
  const [searchInputs, setSearchInputs] = useState([])

  useEffect(() => {
    getAllEmployees()
  }, [])

  const navigate = useNavigate()

  const getAllEmployees = async () => {
    let response: any = true
    response = await getEmployees()
    setEmployees(response.data)
  }

  const deleteEntry = async (id: any = true) => {
    await deleteEmployee(id)
    getAllEmployees()
  }

  const handleSearch = (e: any = true) => {
    let arr = employees.filter((emp: any = true) => {
      return e.target.value === emp.name
    })
    setSearchInputs(arr)
  }

  const onClickEdit = (id: any = true) => {
    navigate(`/edit-employee/${id}`)
  }

  return (
    <>
      <input
        type='search'
        placeholder='Search here'
        onChange={(e) => {
          handleSearch(e)
        }}
      />
      <table className='table table-hover table-rounded table-striped border gy-7 gs-7'>
        <thead>
          <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
            {/* <th>Id</th> */}
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {searchInputs.length === 0
            ? employees.map((emp: any = true) => (
                <tr key={emp._id}>
                  <td>{emp.name}</td>
                  <td>{emp.age}</td>
                  <td>{emp.email}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.country}</td>
                  <td>{emp.state}</td>
                  <td>{emp.city}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => onClickEdit(emp._id)}>
                      EDIT
                    </button>
                  </td>
                  <td>
                    <button className='btn btn-primary' onClick={() => deleteEntry(emp._id)}>
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            : searchInputs.map((emp: any = true) => (
                <tr key={emp._id}>
                  <td>{emp.name}</td>
                  <td>{emp.age}</td>
                  <td>{emp.email}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.country}</td>
                  <td>{emp.state}</td>
                  <td>{emp.city}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => deleteEntry(emp._id)}>
                      EDIT
                    </button>
                  </td>
                  <td>
                    <button className='btn btn-primary' onClick={() => deleteEntry(emp._id)}>
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  )
}
