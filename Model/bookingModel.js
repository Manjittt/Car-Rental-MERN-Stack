import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
        startDate: { type: Date, required: true },
        returnDate: { type: Date, required: true },
        totalAmount: { type: Number, required: true },
        price: { type: Number, required: true },
        status: { type: String, enum: ["booked", "completed", "cancelled", "panding"], default: "panding" }
    },
    { timestamps: true }
);

const bookingModel = mongoose.model("Booking", bookingSchema);

export default bookingModel;