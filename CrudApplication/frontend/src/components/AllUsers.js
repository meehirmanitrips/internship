import React from "react";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";

import { getEmployees } from "../service/api";

// const styledTable = styled(Table)`
//   width: 90%;
//   margin: 50px auto 0 auto;
// `;

const AllUsers = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    let response = await getEmployees();
    setEmployees(response.data);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Salary</TableCell>
          <TableCell>Country</TableCell>
          <TableCell>State</TableCell>
          <TableCell>City</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employees.map((emp) => (
          <TableRow>
            <TableCell>{emp._id}</TableCell>
            <TableCell>{emp.name}</TableCell>
            <TableCell>{emp.age}</TableCell>
            <TableCell>{emp.email}</TableCell>
            <TableCell>{emp.salary}</TableCell>
            <TableCell>{emp.country}</TableCell>
            <TableCell>{emp.state}</TableCell>
            <TableCell>{emp.city}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllUsers;
