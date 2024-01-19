import { Router } from "express";
import {
  createNote,
  getAllNotes,
  getSingleNote,
  removeSingleNote,
  updateSingleNote,
} from "../controllers/note";

const router = Router();

router.post("/create", createNote);
router.patch("/:noteId", updateSingleNote);
router.delete("/:noteId", removeSingleNote);
router.get("/", getAllNotes);
router.get("/:id", getSingleNote);

export default router;
