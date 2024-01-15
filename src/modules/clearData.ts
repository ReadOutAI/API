import fs from "fs";
import path from "path";
import { config } from "../config";

const clearDir = (dir: string) => {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(dir, file), err => {
                if (err) throw err;
            });
        }
    });
}

const deleteFiles = () => {
    clearDir(config.file.uploadDir);
    clearDir(config.process.processedDir);
};

export const autoDelete = () => {
    setInterval(deleteFiles, config.file.deleteEvery);
};