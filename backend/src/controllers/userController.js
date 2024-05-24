import UserModel from '../models/user_model.js'
import BaseController from './baseController.js';

class UserController extends BaseController {
    constructor() {
        super(UserModel);
    }

    async getAllUser(req, res, next) {

        try {

            const pipeLine = [
                // USERINFORMATION ID
                // DEPARTMENT AGGREGATE IN LOCATION 
                {
                    $lookup: {
                        from: 'userinformations',
                        pipeline: [
                            { $project: { photo: 1, tglLahir: 1, alamat: 1, noTelp: 1, job: 1 } }
                        ],
                        as: 'userInformation'
                    }
                },
                { $unwind: { path: '$userInformation', preserveNullAndEmptyArrays: true } },

            ];

            const result = await this.model.aggregate(pipeLine).exec();

            res.status(200).json({
                data: result
            })

        } catch (error) {
            next(error)
        }
    }

}

const userController = new UserController();
export default userController;