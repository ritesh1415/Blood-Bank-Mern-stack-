import express from 'express';

import Adminmiddle from '../Middlewere/Adminmiddle.js'
import Auhmiddle from '../Middlewere/Auhmiddle.js';
import { deleteDonarController, getDonarsListController, getHospitalListController, getOrgListController } from '../Controler/AdminController.js';
const router=express.Router()
router.get('/donar-list',Auhmiddle,Adminmiddle,getDonarsListController)
router.get('/admin/hospital-list',Auhmiddle,Adminmiddle,getHospitalListController)
router.get('/admin/org-list',Auhmiddle,Adminmiddle,getOrgListController)


router.delete('/delete-donar/:id',Auhmiddle,Adminmiddle,deleteDonarController)
export default router;
