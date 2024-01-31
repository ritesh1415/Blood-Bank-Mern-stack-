import express from 'express';
import Auhmiddle from '../Middlewere/Auhmiddle.js';
import {createInventory,getDonarControlller,getHospitel,getInventory, getInventoryhospital, getRecentInventoryController, getorganisationforhospital, organisationController} from '../Controler/inventorycontroller.js';
const router=express.Router()
router.post('/create',Auhmiddle,createInventory)
//get all blood records
router.get('/inventory-get',Auhmiddle,getInventory)

//get recent blood records
router.get('/get-recent-inventory',Auhmiddle,getRecentInventoryController)

//get hospital blood
router.post('/inventory-get-hospital',Auhmiddle,getInventoryhospital)


//set donar records
router.get('/get-donars',Auhmiddle,getDonarControlller)
//hospital records
router.get('/get-hospital',Auhmiddle,getHospitel)

//organisation
router.get('/get-organisation',Auhmiddle,organisationController)
router.get('/get-orgnaisation-for-hospital',Auhmiddle,getorganisationforhospital)

export default router;