import mongoose from "mongoose"

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name of the car"]
    },
    model: {
        type: String,
        required: [true, "Please provide model of the car"]
    },
    year: {
        type: Number,
        required: [true, "Please provide year of manufacture"]
    },
    price: {
        type: Number,
        required: [true, "Please provide price of the car"]
    },
    fuel:{
        type: String,
        default: "Petrol"
    },
    seat:{
        type: Number,
        default: 4
    },
    category:{
        type: String,
        default: "Sedan"
    },
    milage:{
        type: Number,
        default: 10
    },
    price:{
        type: Number,
        default: 1000
    },
    about:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    tansmission:{
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        default: "Available"
    }
}, { timestamps: true });

const carModel = mongoose.model('Car', carSchema);

export default carModel;