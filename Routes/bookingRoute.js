import express from "express"
import { bookingDetailsController, carBookingController, getBookingsController, updateBookingStatusController, userBookingsController,  } from "../Controllers/bookingController.js";
import { get } from "mongoose";
import { authMiddlewere, isAdmin } from "../middlewere/authMiddlewere.js";

const router = express.Router();

// booking car  route
router.post('/create-booking', carBookingController);

// get bookings route
router.get('/get-bookings', getBookingsController);

// get booking details route
router.get('/get-details/:id',authMiddlewere,bookingDetailsController);

// update booking status route
 router.patch('/update-status/:id', updateBookingStatusController);

 //user booking details route
 router.get('/user-bookings/:id', authMiddlewere, userBookingsController);

export default router;


