import { Router } from "express";
import {
  addPublisher,
  deletePublisher,
  deletePublishers,
  getPublishers,
  udpatePublisher,
} from "../controllers/publisherController";

const router = Router();

router.post("/publisher", addPublisher);
router.get("/publishers", getPublishers);
router.delete("/publisher/:id", deletePublisher);
router.delete("/publishers/:id", deletePublishers);
router.patch("/publisher/:id", udpatePublisher);

export default router;
