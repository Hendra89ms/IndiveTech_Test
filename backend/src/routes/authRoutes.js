import { Router } from "express";
import { registerUserController, loginController } from "../controllers/authController.js";

const locationAuth = Router()

locationAuth.post("/register", async (req, res, next) => {
    await registerUserController.createUser(req, res, next);
})

locationAuth.post("/login", async (req, res, next) => {
    await loginController.login(req, res, next)
})

locationAuth.get("/verify/:token", async (req, res, next) => {
    await registerUserController.verifyEmail(req, res, next)
})


export default locationAuth;