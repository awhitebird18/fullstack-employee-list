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
          color: "",
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
          color: "",
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

  const handleCancel = (e) => {
    e.preventDefault();

    setFormData({
      name: "",
      code: "",
      profession: "",
      color: "",
      city: "",
      branch: "",
      assigned: false,
    });

    setDrawerOpen(false);
  };

  if (!formData) {
    return null;
  }

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
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              handleChange(e, "name");
            }}
          />
        </div>

        <div className="form-control">
          <label htmlFor="">Profession</label>
          <input
            type="text"
            value={formData.profession}
            onChange={(e) => {
              handleChange(e, "profession");
            }}
          />
        </div>

        <div className="form-control">
          <label htmlFor="">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => {
              handleChange(e, "city");
            }}
          />
        </div>

        <div className="form-control">
          <label htmlFor="">Branch</label>
          <select
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

        <div
          className="form-control"
          style={{ display: "inline-block", marginRight: "1rem" }}
        >
          <label htmlFor="">Assigned?</label>
          <input
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

        <div className="form-actions">
          <button onClick={(e) => handleCancel(e)}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeDetails;
