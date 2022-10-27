import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeDetails from "./EmployeeDetails.jsx";
import { BsSearch } from "react-icons/bs";
import "./index.css";

const index = () => {
  const [employees, setEmployees] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    name: "",
    code: "",
    profession: "",
    color: "",
    city: "",
    branch: "",
    assigned: false,
  });

  const [employeeSearch, setEmployeeSearch] = useState([""]);

  // Fetch employees on load
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/employees");

        if (response) {
          const { data } = response.data;
          console.log(data);
          setEmployees(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  //   Add employee handler
  const handleAddEmployee = (id) => {
    setCurrentEmployee({
      name: "",
      code: "",
      profession: "",
      color: "",
      city: "",
      branch: "",
      assigned: false,
    });

    setDrawerOpen(true);
  };

  const handleSearch = (e) => {
    setEmployeeSearch(e.target.value);
  };

  return (
    <div className="employee-list">
      <header className="employee-list-header">
        <h2>Employee List</h2>
        <button className="add-employee-btn" onClick={handleAddEmployee}>
          <span>+</span> Add Employee
        </button>
      </header>
      <main className="employee-list-body">
        <div className="employee-list-filters">
          <input placeholder="Search Employee Name" onChange={handleSearch} />
          <span>
            <BsSearch />
          </span>
        </div>

        <div className="employee-list-content">
          <EmployeeTable
            employees={employees}
            setEmployees={setEmployees}
            setDrawerOpen={setDrawerOpen}
            setCurrentEmployee={setCurrentEmployee}
            employeeSearch={employeeSearch}
          />

          <EmployeeDetails
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            setEmployees={setEmployees}
            formData={currentEmployee}
            setFormData={setCurrentEmployee}
          />
        </div>
      </main>
    </div>
  );
};

export default index;
