import express from "express";
import {
  addEmployee,
  getEmployees,
} from "../controller/employee-controller.js";

const router = express.Router();

router.post("/add", addEmployee);
router.get("/", getEmployees);

export default router;
