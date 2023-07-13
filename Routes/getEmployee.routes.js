const express = require("express");
const { employeeModel } = require("../Models/employee.model");
const getEmployeeRouter = express.Router();

getEmployeeRouter.get("/", async (req, res) => {
  let sort,page,limit,from,till,employees,pages;
  
  if(req.query.sort==="asc"){
    sort=1;
  }else if(req.query.sort==="desc"){
    sort=-1;
  }

  let type=req.query.type
  let sortObj={};
  sortObj[type]=sort;

  page= +req.query.page;
  limit= +req.query.limit;

  from= +req.query.from;
  till= +req.query.till;

  delete req.query.sort;
  delete req.query.type;
  delete req.query.page;
  delete req.query.limit;
  delete req.query.from;
  delete req.query.till;

  try {
    if(sort && type && from>0 && till>0){
      employees=await employeeModel.find({$and:[req.query,{$and:[{price: {$gte: from}},{price: {$lte: till}}]}]}).sort(sortObj);;
    }else if(from>0 && till>0){
      employees=await employeeModel.find({$and:[req.query,{$and:[{price: {$gte: from}},{price: {$lte: till}}]}]});
    }else if(sort && type){
      employees=await employeeModel.find(req.query).sort(sortObj);
    }else{
      employees=await employeeModel.find(req.query)
    }

    if(page>0 && limit>0){
      pages=Math.ceil(employees.length/limit);
      employees=employees.slice((page-1) * limit, page * limit);
    }else if(page<0 || limit<0){
      employees=[];
    }

    res.status(200).send([employees,pages]);
  } catch (err) {
    res.status(400).send({"err":err.message});
  }
});

module.exports = { getEmployeeRouter };
