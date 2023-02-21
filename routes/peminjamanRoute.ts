import { Router } from "express";
import {
  addPeminjaman,
  deletePeminjaman,
  getPeminjamans,
  updatePeminjaman,
} from "../controllers/peminjamanController";

const router = Router();

router.get("/peminjamans", getPeminjamans);
router.post("/peminjaman", addPeminjaman);
router.put("/peminjaman/:id", updatePeminjaman);
router.delete("/peminjaman/:id", deletePeminjaman);

export default router;
