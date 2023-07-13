const express = require("express");
const { employeeModel } = require("../Models/employee.model");
const addEmployeeRouter = express.Router();

addEmployeeRouter.post("/add", async (req, res) => {
    try {
      const new_employee = new employeeModel(req.body);
      await new_employee.save();
      res.status(200).send({ msg: "A new employee has been added" });
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  });

  module.exports={addEmployeeRouter}