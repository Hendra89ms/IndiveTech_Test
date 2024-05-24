import jwt from 'jsonwebtoken'
import env from 'dotenv'
import asyncHandler from "express-async-handler";
import { customizeError } from '../utils/common.js'
import User from '../models/user_model.js'
env.config()

const isAuthorized = asyncHandler(async (req, res, next) => {

    let token;
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];

            const secretKey = process.env.JWT_SECRET;

            // Token Validation
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) return res.sendStatus(403);

                req.user = decoded;
                next();
            });

        } else {
            throw customizeError(401, "No token found");
        }
    } catch (err) {
        next(err)
    }
});

const isRole = (permissionRole) => {

    return async (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "Token Not Found!" });
        }

        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);

        await User.findOne({ email: decoded._doc.email }).then(user => {

            // IF ROLE FROM MODEL TRUE, CAN ACCESS ROUTES
            const ceckRole = permissionRole.some(role => role.includes(role))

            if (ceckRole) {
                next()
            } else {
                res.status(401).json({ error: "Role is False" });
            }
        }).catch(err => {
            console.log("ERROR : ", err)
            res.status(401).json({ error: "Unauthorized" });
        })

    }
}

export {
    isAuthorized,
    isRole
};
