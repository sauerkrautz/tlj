import { Router } from "express";
import {
  addPengembalian,
  deletePengembalian,
  getPengembalians,
  updatePengembalian,
} from "../controllers/pengembalianController";

const router = Router();

router.get("/pengembalian", getPengembalians);
router.post("/pengembalian", addPengembalian);
router.put("/pengembalian/:id", updatePengembalian);
router.delete("/pengembalian/:id", deletePengembalian);

export default router;
