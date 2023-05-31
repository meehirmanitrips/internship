import React from "react";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import { getEmployees, deleteEmployee } from "../service/api";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #3385ff;
    color: #ffffff;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

const AllUsers = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    let response = await getEmployees();
    setEmployees(response.data);
  };

  const deleteEntry = async (id) => {
    await deleteEmployee(id);
    getAllEmployees();
  };

  return (
    <>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>State</TableCell>
            <TableCell>City</TableCell>
            <TableCell></TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TRow key={emp._id}>
              <TableCell>{emp._id}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.age}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.salary}</TableCell>
              <TableCell>{emp.country}</TableCell>
              <TableCell>{emp.state}</TableCell>
              <TableCell>{emp.city}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/edit/${emp._id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteEntry(emp._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default AllUsers;
