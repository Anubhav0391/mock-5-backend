const express = require("express");
const { employeeModel } = require("../Models/employee.model");
const updateEmployeeRouter = express.Router();

updateEmployeeRouter.put("/update/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    const new_employee = await employeeModel.findByIdAndUpdate({ "_id": Id },req.body);
    res.status(200).send({ msg: "user updated", user: new_employee });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { updateEmployeeRouter };
