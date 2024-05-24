import BaseController from "./baseController.js";
import UserInformationModel from '../models/userInformation_model.js'


class UserInformationController extends BaseController {
    constructor() {
        super(UserInformationModel)
    }

}

const userInformationControler = new UserInformationController()
export default userInformationControler;