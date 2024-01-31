import express from "express";
import Testcontroller from "../Controler/Testcontroller.js";

const router = express.Router();
router.get('/', Testcontroller);

export default router;
