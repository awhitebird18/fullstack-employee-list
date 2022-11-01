import React, { useMemo } from "react";
import { useTable } from "react-table";
import axios from "axios";
import "./employeeTable.css";

const EmployeeTable = ({
  employees,
  setEmployees,
  setDrawerOpen,
  setCurrentEmployee,
  employeeSearch,
}) => {
  // Table Columns
  const columns = useMemo(
    () => [
      {
        Header: "Code",
        accessor: "code", // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Profession",
        accessor: "profession",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Branch",
        accessor: "branch",
        width: "10px",
      },
      {
        Header: "Assigned",
        accessor: "assigned",
        Cell: ({ value }) =>
          `${value.toString()[0].toUpperCase()}${value
            .toString()
            .slice(1)
            .toLowerCase()}`,
      },
      {
        Header: "Color",
        accessor: "color",
        Cell: ({ value }) => (
          <div style={{ backgroundColor: value }} className="color-icon"></div>
        ),
      },
    ],
    []
  );

  // Table Data
  const data = useMemo(() => [...employees], [employees]);

  // Table custom delete column
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Delete",
        Header: "",

        Cell: ({ row }) => {
          return (
            <button
              className="delete-employee-btn"
              onClick={(e) => handleDelete(e, row.original.id)}
              style={{ width: "min-content" }}
            >
              Delete
            </button>
          );
        },
      },
    ]);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, tableHooks);

  // Set Employee to Update
  const handleUpdateEmployee = (id) => {
    const employee = employees.find((employee) => {
      return employee.id === id;
    });

    setCurrentEmployee(employee);
    setDrawerOpen(true);
  };

  // Delete Employee
  const handleDelete = async (e, id) => {
    e.stopPropagation();

    const response = await axios.delete(
      `http://localhost:8080/api/employees/${id}`
    );

    if (response) {
      setEmployees((state) => {
        return state.filter((employee) => {
          return employee.id !== id;
        });
      });

      setCurrentEmployee({
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
  };

  return (
    <table className="employee-list-table" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 1px #ddd",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold",
                }}
                className="table-header"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows
          .filter((row) => {
            return row.original.name
              .toLowerCase()
              .includes(employeeSearch.toString().toLowerCase());
          })
          .map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => handleUpdateEmployee(row.original.id)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="table-cell">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
