import express from 'express';
import { deleteUserController, LoginController, registerController, updateProfileController } from '../Controllers/authController.js';

const router = express.Router();

// REGISTER ROUTE

router.post('/register', registerController);

// LOGIN ROUTE

router.post('/login', LoginController)

// update profile route 

router.put('/update-profile/:id', updateProfileController)

// detete account route

router.delete('/delete-account/:id', deleteUserController);


export default router;