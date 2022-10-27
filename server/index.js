const express = require("express");
const cors = require("cors");
require("dotenv").config();
const employeeRoutes = require("./routes/employeeRoutes.js");

console.log(process.env);

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);

app.listen(8080, () => console.log("Job Dispatch API running on port 8080!"));
