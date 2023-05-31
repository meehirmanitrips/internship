import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {getEmployees, deleteEmployee} from '../services/api'

export function EmployeePage() {
  const [employees, setEmployees] = useState([])
  // Stores all the results of the search input
  const [searchInputs, setSearchInputs] = useState([])

  // Defining variables for the pagination part
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records = employees.slice(firstIndex, lastIndex)
  const noOfPages = Math.ceil(employees.length / recordsPerPage)
  const numbers = Array.from({length: noOfPages}, (_, i) => i + 1)

  useEffect(() => {
    getAllEmployees()
  }, [])

  // Used for navigating to the edit page
  const navigate = useNavigate()

  // Gets the data of all the employees from the database using the getEmployees api and stores it in the employees state.
  const getAllEmployees = async () => {
    let response: any = true
    response = await getEmployees()
    setEmployees(response.data)
  }

  // Function for deleting the employee data
  const deleteEntry = async (id: any = true) => {
    await deleteEmployee(id)
    getAllEmployees()
  }

  // Function for filtering out the seach results and storing it in the searchInputs state.
  const handleSearch = (e: any = true) => {
    let arr = employees.filter((emp: any = true) => {
      return e.target.value === emp.name
    })
    setSearchInputs(arr)
  }

  // Function to navigate to the Edit page.
  const onClickEdit = (id: any = true) => {
    navigate(`/edit-employee/${id}`)
  }

  // Defining functions for pagination
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage !== noOfPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const changeCurrentPage = (n: any = true) => {
    setCurrentPage(n)
  }

  return (
    <>
      <input
        type='search'
        placeholder='Search here'
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: 'none',
          width: '100%',
          maxWidth: '500px',
          margin: '10px 0',
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
          backgroundColor: '#fff',
          backgroundImage: 'none',
          outline: 'none',
          boxSizing: 'border-box',
        }}
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
            ? records.map((emp: any = true) => (
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
      <ul className='pagination'>
        <li className='page-item previous'>
          {/* eslint-disable-next-line */}
          <a href='#' className='page-link'>
            <i className='previous' onClick={prevPage}></i>
          </a>
        </li>
        {numbers.map((n, i) => (
          <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
            {/* eslint-disable-next-line */}
            <a href='#' className='page-link' onClick={() => changeCurrentPage(n)}>
              {n}
            </a>
          </li>
        ))}
        <li className='page-item next'>
          {/* eslint-disable-next-line */}
          <a href='#' className='page-link'>
            <i className='next' onClick={nextPage}></i>
          </a>
        </li>
      </ul>
    </>
  )
}
