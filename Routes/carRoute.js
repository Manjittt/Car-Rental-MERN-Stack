import express from 'express';
import {addCarController, deleteCarController, getCarsController, singleCarController, updateCarController} from '../Controllers/carController.js';


const router = express.Router();


// add car route
router.post("/add-car", addCarController);

// get cars route

 router.get("/get-cars", getCarsController);

 //update car route

 router.put("/update-car/:id",updateCarController);


// delete car route
router.delete("/delete-car/:id", deleteCarController);

// get single car route

router.get("/get-car/:id", singleCarController);

export default router;