const sharp = require("../../utility/sharp");
const imageModel = require("../../models/images");
const moment = require('moment');

const controller = {};

controller.imageUpload = async (req) => {
    try {
        sharp(req);

        let format = req.file.originalname.slice(req.file.originalname.indexOf(".") + 1)

        let obj = {
            date: moment().format("YYYY-MM-DD"),
            imageUrl: req.file.path,
            format,
            name: req.file.originalname,
            mimetype: req.file.mimetype,
            encoding: req.file.encoding,
        };
        await imageModel.create(obj);

    } catch (err) {
        return Promise.reject(err);
    }
};

controller.getImage = async (obj) => {
    try {
        if (!obj.filename && !obj.from) {
            throw Object.assign(new Error('Invalid body parameters'), { statusCode: 400 })
        }

        let query = {}
        if (obj.filename) {
            query.name = obj.filename
        }
        if (obj.from) {
            let from = obj.from;
            let to = obj.to ? obj.to : moment().format("YYYY-MM-DD")
            query.date = {
                $gte: from,
                $lte: to,
            }
        }

        return await imageModel.find(query).limit(obj.limit).skip(obj.limit * obj.skip);

    } catch (err) {
        return Promise.reject(err);
    }
};

module.exports = controller;
