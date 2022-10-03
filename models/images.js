const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema(
    {
        date: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        name: {
            type: String,
        },
        format: {
            type: String,
        },
        mimetype: {
            type: String,
        },
        encoding: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

let image = mongoose.model("image", imageSchema);

module.exports = image;
