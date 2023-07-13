const express = require("express");
const { connection } = require("./Config/db");
const { registerRouter } = require("./Routes/register.route");
const { LoginRouter } = require("./Routes/login.routes");
const { addEmployeeRouter } = require("./Routes/addEmployee.routes");
const { deleteEmployeeRouter } = require("./Routes/deleteEmployee.routes");
const { updateEmployeeRouter } = require("./Routes/editEmployee.routes");
const { getEmployeeRouter } = require("./Routes/getEmployee.routes");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/users", registerRouter);
app.use("/users", LoginRouter);

app.use("/employees",addEmployeeRouter);
app.use("/employees", deleteEmployeeRouter);
app.use("/employees", updateEmployeeRouter);
app.use("/employees", getEmployeeRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to atlas database");
  } catch (error) {
    console.log(error);
  }
  console.log("Server is running on Port", process.env.PORT);
});
