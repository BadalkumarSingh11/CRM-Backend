import express from "express";
const router = express.Router();
import {
    login,
    logout,
    register,
    getAllEmployees,
    getAnEmployee,
} from "../Controllers/employees.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, admin, getAllEmployees);
router.route("/:id").get(protect, admin, getAnEmployee);
router.route("/me").get(protect, getAnEmployee);

// Route to register a new user
router.route("/register").post(protect, admin, register);

// Route to login
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;
