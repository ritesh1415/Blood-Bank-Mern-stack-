import express from 'express';
import Auhmiddle from '../Middlewere/Auhmiddle.js';
// const {
//   bloodGroupDetailsContoller,
// } = require("../controllers/analyticsController");
import bloodGroupDetailsContoller from '../Controler/AnalyticsController.js';

const router = express.Router();

//routes

//GET BLOOD DATA
router.get("/bloodGroups-data", Auhmiddle, bloodGroupDetailsContoller);

export default router;