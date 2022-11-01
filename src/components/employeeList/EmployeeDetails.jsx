import React from "react";
import axios from "axios";
import "./employeeDetails.css";

const EmployeeDetails = ({
  drawerOpen,
  setDrawerOpen,
  setEmployees,
  formData,
  setFormData,
}) => {
  // Update Current Employee
  const handleChange = (e, field) => {
    e.persist();

    setFormData((state) => {
      const stateCopy = { ...state };

      stateCopy[field] =
        e.target.type === "text" ||
        e.target.type === "select-one" ||
        e.target.type === "color"
          ? e.target.value
          : e.target.checked;

      return stateCopy;
    });
  };

  // On form submit, add new employee to db and update state
  const handleAddEmployee = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:8080/api/employees",
        formData
      );

      if (result) {
        const { data } = result.data;

        setEmployees((state) => {
          const stateCopy = [...state];

          stateCopy.push(data);

          return stateCopy;
        });

        setFormData({
          name: "",
          code: "",
          profession: "",
          color: "#ffffff",
          city: "",
          branch: "",
          assigned: "True",
        });

        setDrawerOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // On form submit, update employee in db and update state
  const handleUpdateEmployee = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.put(
        `http://localhost:8080/api/employees/${formData.id}`,
        formData
      );

      if (result) {
        const { data } = result.data;

        setEmployees((state) => {
          const stateCopy = [...state];

          const index = stateCopy.findIndex(
            (employee) => employee.id === data.id
          );

          if (index !== -1) {
            stateCopy.splice(index, 1, data);
          }

          return stateCopy;
        });

        setFormData({
          name: "",
          code: "",
          profession: "",
          color: "#ffffff",
          city: "",
          branch: "",
          assigned: false,
        });

        setDrawerOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // On cancel, resets current employee object
  const handleCancel = (e) => {
    e.preventDefault();

    setFormData({
      name: "",
      code: "",
      profession: "",
      color: "#ffffff",
      city: "",
      branch: "",
      assigned: false,
    });

    setDrawerOpen(false);
  };

  return (
    <div className={`drawer ${drawerOpen ? "open" : ""}`}>
      <form onSubmit={formData.id ? handleUpdateEmployee : handleAddEmployee}>
        <h3 style={{ whiteSpace: "no-wrap" }}>
          {formData.id ? "Update Employee" : "Add Employee"}
        </h3>

        <div className="form-control">
          <label htmlFor="code">Code</label>
          <input
            id="code"
            type="text"
            value={formData.code}
            onChange={(e) => {
              handleChange(e, "code");
            }}
          />
        </div>

        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => {
              handleChange(e, "name");
            }}
          />
        </div>

        <div className="form-control">
          <label htmlFor="profession">Profession</label>
          <input
            id="profession"
            type="text"
            value={formData.profession}
            onChange={(e) => {
              handleChange(e, "profession");
            }}
          />
        </div>

        <div className="form-control">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => {
              handleChange(e, "city");
            }}
          />
        </div>

        <div className="form-control">
          <label htmlFor="branch">Branch</label>
          <select
            id="branch"
            type="text"
            value={formData.branch}
            onChange={(e) => {
              handleChange(e, "branch");
            }}
          >
            <option value="">Select</option>
            <option value="Abacus">Abacus</option>
            <option value="Pillsworth">Pillsworth</option>
          </select>
        </div>

        <div style={{ whiteSpace: "nowrap", display: "inline-block" }}>
          <div
            className="form-control"
            style={{ display: "inline-block", marginRight: "1rem" }}
          >
            <label htmlFor="assigned">Assigned?</label>
            <input
              id="assigned"
              type="checkbox"
              checked={formData.assigned}
              onChange={(e) => {
                handleChange(e, "assigned");
              }}
            />
          </div>

          <div className="form-control" style={{ display: "inline-block" }}>
            <label htmlFor="color">Color</label>
            <input
              id="color"
              type="color"
              value={formData.color}
              onChange={(e) => {
                handleChange(e, "color");
              }}
            />
          </div>
        </div>

        <div className="form-actions">
          <button onClick={(e) => handleCancel(e)}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeDetails;
