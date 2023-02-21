import { Router } from "express";
import {
  addStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../controllers/studentController";

const router = Router();

router.get("/students", getStudents);
router.post("/student", addStudent);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);

export default router;
