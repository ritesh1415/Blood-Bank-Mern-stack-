import express from "express";
import Authmiddle from "../Middlewere/Auhmiddle.js"
import {  RegisterController, LoginController,Currentuser } from "../Controler/RegisterController.js";

const router = express.Router();

router.post('/register', RegisterController);
router.post('/login', LoginController);
router.get('/current',Authmiddle, Currentuser)

export default router;
