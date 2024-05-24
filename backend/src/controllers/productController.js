import BaseController from "./baseController";
import ProductModel from "../models/product_model.js";

class ProductController extends BaseController {
    constructor() {
        super(ProductModel)
    }

}

const productModel = new ProductController()
export default productModel;