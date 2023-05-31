import express from "express";
import {
  addEmployee,
  getEmployees,
  getEmployee,
  editEmployee,
  deleteEmployee,
  uniqueEmail,
  signupEmployee,
} from "../controller/employee-controller.js";

const router = express.Router();

router.post("/api/unique-email/", uniqueEmail);
router.post("/add", addEmployee);
router.post("/signup", signupEmployee);
router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.put("/:id", editEmployee);
router.delete("/:id", deleteEmployee);

export default router;
