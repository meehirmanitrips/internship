import React from "react";
import { AppBar, Toolbar, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = styled(AppBar)``;

const Tabs = styled(NavLink)`
  font-size: 20px;
  margin-right: 20px;
  color: inherit;
  text-decoration: none;
`;

const NavBar = () => {
  return (
    <>
      <Header position="static">
        <Toolbar>
          <Tabs to="/">All Employees</Tabs>
          <Tabs to="/add">Add Employee</Tabs>
          <Tabs to="/search">Search Employee</Tabs>
        </Toolbar>
      </Header>
    </>
  );
};

export default NavBar;
