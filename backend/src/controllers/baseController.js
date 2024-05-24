import { customizeError } from '../utils/common.js'

class BaseController {

    constructor(model) {
        if (new.target === BaseController) {
            throw new TypeError("Cannot construct BaseController instances directly");
        }
        this.model = model;
    }

    async getAll(req, res, next) {

        try {
            // QUERY BASE ON MODEL DATA
            let query = {};

            for (const key in req.query) {
                if (key !== 'pages' &&
                    key !== 'limit' &&
                    key !== 'sortBy' &&
                    key !== 'orderBy' && Object.prototype.hasOwnProperty.call(req.query, key)) {
                    // Check if the field exists in the model
                    const fieldExists = Object.keys(this.model.schema.paths).includes(key);
                    if (fieldExists) {
                        query[key] = req.query[key]; // Add to search criteria
                    } else {
                        return res.status(500).json({
                            msg: `Field '${key}' Not Found`
                        });
                    }
                }
            }

            const totalDoc = await this.model.countDocuments();

            // PAGINATION
            const pages = parseInt(req.query.pages) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (pages - 1) * limit;
            // SORTING BY ASCENDING OR DESCENDING
            const sortBy = req.query.sortBy || 'createdAt';
            const orderBy = req.query.orderBy || 1;

            const data = await this.model.find(query)
                .sort({ [sortBy]: orderBy })
                .limit(limit)
                .skip(skip)

            const dataQuery = await this.model.find(query)

            const totalDocs = query !== null ? dataQuery.length : totalDoc

            return res.status(200).json({ pages: pages, limit: limit, totalDoc: totalDocs, data: data, });

        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        const { uId } = req.params;

        try {
            const data = await this.model.findOne({ uId });
            if (!data) {
                throw customizeError(400, "Resource not found");
            }
            return res.status(200).json({ data: data });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {

        try {

            const photo = req.file.originalname;

            const allData = {
                ...req.body,
                photo: photo
            }

            const createdData = await this.model.create(allData);

            if (!createdData) {
                throw customizeError(400, "Create data failed");
            }

            return res.status(200).json({ data: createdData, });
        } catch (error) {
            next(error);
        }

    }

    async update(req, res, next) {
        const { uId } = req.params;
        const updatedData = req.body;
        try {
            const result = await this.model.findOneAndUpdate({ uId }, updatedData, { new: true });
            if (!result) {
                throw customizeError(400, "Update data failed");
            }

            return res.status(200).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        const { uId } = req.params;
        try {
            const result = await this.model.findOneAndDelete({ uId });
            if (!result) {
                throw customizeError(400, "Delete data failed");
            }
            return res.status(200).json({ message: "Data deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}


export default BaseController;