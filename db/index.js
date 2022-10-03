const mongoose = require("mongoose");
const Config = require("config");
const db = Config.get("mongoDb");

let mongoURL = `mongodb+srv://${db.username}:${db.password}@devcluster.gxadvcs.mongodb.net/images?retryWrites=true&w=majority`;

mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected.");
    })
    .catch((err) => console.log(err.message));
