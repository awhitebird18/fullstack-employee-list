import React from "react";
import EmployeeList from "./components/employeeList/index.jsx";
import SideNav from "./components/sideNav";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <SideNav />

      <EmployeeList />
    </div>
  );
};

export default App;
