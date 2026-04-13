import bookingModel from "../Model/bookingModel.js";
import userModel from "../Model/userModel.js";
import carModel from "../Model/carModel.js";

export const carBookingController = async (req, res) => {
  try {
    const { user, car, startDate, returnDate, totalAmount, price } = req.body;

    if (!user || !car || !startDate || !returnDate || !totalAmount || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required for booking",
      });
    }

    const newBooking = new bookingModel({
      user,
      car,
      startDate,
      returnDate,
      totalAmount,
      price,
    });

    await newBooking.save();

    return res.status(201).json({
      success: true,
      message: "Car booked successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in booking car",
      error: error.message,
    });
  }
};

// get all bookings controller

export const getBookingsController = async (req, res) => {
  try {
    const bookings = await bookingModel.find({});
    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching bookings",
      error: error.message,
    });
  }
};
//get booking details controller

export const bookingDetailsController = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await bookingModel.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const user = await userModel.findById(booking.user);
    const car = await carModel.findById(booking.car);

    return res.status(200).json({
      success: true,
      message: "Booking details fetched successfully",
      booking: {
        id: booking._id,
        customer: user.name,
        phone : user.phone,
        startDate: booking.startDate,
        returnDate: booking.returnDate,
        totalAmount: booking.totalAmount,
        status: booking.status,
        bookingTime: booking.createdAt
        
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching booking details",
      error: error.message,
    });
  }
};

// update booking status controller
export const updateBookingStatusController = async (req, res) => {
  try {
    const {id} = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Booking id is required",
      });
    }
    
    const { status } = req.body;
    const booking = await bookingModel.findByIdAndUpdate(id, {$set: {status}}, {returnOriginal: false});
    
    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({

      success: false,

      message: "Error in updating booking status",
      
      error: error.message,

    });
  }
};

// user bookings controller
export const userBookingsController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate user id
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }

    // Check user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch bookings with car details
    const bookings = await bookingModel
      .find({ user: user._id })
      .populate("car"); // 🔥 IMPORTANT

    if (bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No bookings found",
        total: 0,
        bookings: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "User bookings fetched successfully",
      total: bookings.length,
      bookings: bookings.map((booking) => ({
        bookingId: booking._id,
        carName: booking.car?.name,
        carPrice: booking.car?.price,
        totalAmount: booking.totalAmount,
        startDate: booking.startDate,
        returnDate: booking.returnDate,
        bookingTime: booking.createdAt,
        status: booking.status,
        
      })),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching user bookings",
      error: error.message,
    });
  }
};
