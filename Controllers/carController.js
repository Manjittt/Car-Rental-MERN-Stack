import carModel from "../Model/carModel.js";


// Create Car Controller

export const addCarController = async (req, res) => {
    try {
        const { name, model, year, price, about, fuel, seat, category, milage, transmission, status } = req.body;
        if (!name || !model || !year || !price || !about || !fuel || !seat || !category || !milage || !transmission || !status) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required fields"
            });
        }
  const car = new carModel({ name, model, year, price, about, fuel, seat, category, milage, transmission, status });
        await car.save();
        return res.status(201).send({
            success: true,
            message: "Car added successfully",
            car
        });


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in adding car",
            error
        });
    }
}

// Get All Cars Controller
export const getCarsController = async (req, res) => {
    try {
        const cars = await carModel.find({});
        return res.status(200).send({
            success: true,
            message: "Cars fetched successfully",
            total : cars.length,
            cars
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in fetching cars",
            error
        });
    }
}

// Update Car Controller
export const updateCarController = async (req, res) => {
    try {
        const carId = req.params.id;
        const updateData = req.body;
        const updatedCar = await carModel.findByIdAndUpdate(carId, updateData, { new: true });

        if (!updatedCar) {
            return res.status(404).send({
                success: false,
                message: "Car not found"
            });
        }
        return res.status(200).send({
            success: true,
            message: "Car updated successfully",
            updatedCar
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in updating car",
            error
        });
    }
}
//get single car controller
export const singleCarController = async (req, res) => {
    try {
        const carId = req.params.id;
        const car = await carModel.findById(carId);

        if (!car) {
            return res.status(404).send({
                success: false,
                message: "Car not found"
            });
        }
        return res.status(200).send({
            success: true,

            message: "Car fetched successfully",
            car
        });
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in fetching car",
            error
        });
    }
}



// delete Car Controller

export const deleteCarController = async (req, res) => {
    try {
        const carId = req.params.id;
        const deletedCar = await carModel.findByIdAndDelete(carId);
        
        if (!deletedCar) {
            return res.status(404).send({
                success: false,
                message: "Car not found"
            });
        }
        return res.status(200).send({
            success: true,
            message: "Car deleted successfully",
            deletedCar
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in deleting car",
            error
        });
    }
}