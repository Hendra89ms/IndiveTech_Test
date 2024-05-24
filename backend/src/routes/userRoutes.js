import { Router } from "express";
import userInformationControler from "../controllers/userInformationController.js";
import userController from "../controllers/userController.js";
import { uploadMdw } from "../utils/uploadFile.js";

export const locationUser = Router()

locationUser.post("/", uploadMdw.single("photo"), async (req, res, next) => {
    userInformationControler.create(req, res, next)
})

locationUser.get("/", async (req, res, next) => {
    userController.getAllUser(req, res, next)
})