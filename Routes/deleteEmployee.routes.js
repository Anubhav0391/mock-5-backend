const express = require("express");
const { employeeModel } = require("../Models/employee.model");
const deleteEmployeeRouter = express.Router();

deleteEmployeeRouter.delete("/delete/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    await employeeModel.findByIdAndDelete({ "_id": Id });
    res.status(200).send({ msg: "Employee has been removed successfully" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { deleteEmployeeRouter };
