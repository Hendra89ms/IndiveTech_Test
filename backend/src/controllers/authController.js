import bcrypt from 'bcryptjs'
import jwt, { decode } from 'jsonwebtoken'
import env from 'dotenv'
// import nodeMailer from 'nodemailer'
import BaseController from '../controllers/baseController.js'
import UserModel from '../models/user_model.js'
import { sendConfirmationEmail } from '../utils/nodemailer.js'
env.config()


class RegisterUser extends BaseController {

    constructor() {
        super(UserModel);
    }

    async createUser(req, res, next) {
        try {
            const { email, password } = req.body;

            // Cek Email already registered
            const existingUser = await this.model.findOne({ email })
            if (existingUser) {
                return res.status(500).json({
                    msg: "Email already registered!",
                });
            }

            const genSalPasword = await bcrypt.genSalt();

            // Hash Password
            const hashPassword = await bcrypt.hash(password, genSalPasword);


            const createdData = await this.model.create({ ...req.body, password: hashPassword });

            if (!createdData) {
                throw customizeError(400, "Create data failed");
            }

            // PAYLOAD
            const payLoad = { ...createdData }

            if (payLoad._doc && payLoad._doc.password) {
                delete payLoad._doc.password;
            }

            const expired = "1d"

            // CREATE TOKEN
            const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
                expiresIn: expired,
            });

            res.status(200).json({ payLoad: payLoad._doc, token: accessToken, expired });

            // SEND TO EMAIL
            sendConfirmationEmail(createdData, accessToken)
        } catch (error) {
            next(error)
        }
    }

    async verifyEmail(req, res, next) {
        const { token } = req.params;

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);


            const email = decoded._doc.email;

            const user = await this.model.findOne({ email });

            if (user) {
                user.isVerification = true;
                const uId = user._doc.uId

                await this.model.findOneAndUpdate({ uId }, user._doc, { new: true })

                res.status(200).json({ data: user._doc, status: 'Email verified successfully' });
            } else {
                res.status(400).json('Invalid token');
            }
        } catch (error) {
            next(error)
        }
    }

}

class LoginController {

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email })

            if (!user) {
                return res.status(500).json({ msg: "Email Not Found!" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(500).json({ msg: "Wrong Password!" });
            }

            if (!user.isVerification) {
                return res.status(500).json({ msg: "Verification First Your Email!" })
            }

            const payLoad = await { ...user };

            // DELETE PASSWORD
            if (user._doc && user._doc.password) {
                delete user._doc.password;
            }

            const expired = "1d"

            // CREATE TOKEN
            const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
                expiresIn: expired,
            });

            return res.status(200).json({ msg: "Login Success", token: accessToken, payLoad: payLoad._doc, expired: expired });
        } catch (error) {
            next(error)
        }
    }
}


const loginController = new LoginController();
const registerUserController = new RegisterUser();
export { registerUserController, loginController }