import "dotenv/config";
import express from "express";
import fs from "fs";
import { config } from "./config";
import { autoDelete } from "./modules/clearData";

// Routes
import { uploadRouter } from "./routes/upload";
import { convertRouter } from "./routes/convert";
import { statusRouter } from "./routes/status";

const app = express();

// Fix cors error
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Host processed directory as static
app.use("/processed", express.static(config.process.processedDir));

// Ensure that the directories exist
if (!fs.existsSync(config.file.uploadDir)) {
    fs.mkdirSync(config.file.uploadDir);
}
else if (!fs.existsSync(config.process.processedDir)) {
    fs.mkdirSync(config.process.processedDir);
}

// Register routes
app.use(uploadRouter);
app.use(convertRouter);
app.use(statusRouter);

app.get("/", (req, res) => {
    res.status(200).send("Working as expected :)");
});

app.listen(config.api.port, () => {
    console.log(`Server listening on port ${config.api.port}`);
});

autoDelete();