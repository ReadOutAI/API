import { config } from "../config";
import { extractText } from "./extractText";
import { textToAudio } from "./textToAudio";
import fs from "fs";

export const convert = async (fileName: string) => {

    if (!fs.existsSync(`${config.file.uploadDir}/${fileName}`)) {
        return {
            status: "error",
            message: "File does not exist."
        }
    }

    else if (config.process.queue.has(fileName)) {
        if (config.process.queue.get(fileName).status === "processing") {
            return {
                status: "error",
                message: "File is already being processed."
            }
        }
    }

    const text = await extractText(fileName);
    if (!text) {
        return {
            status: "error",
            message: "Error extracting text from file.",
        };
    }

    const audio = await textToAudio(text, fileName);
    if (!audio) {
        return {
            status: "error",
            message: "Error converting text to audio.",
        };
    }

    return {
        status: "done",
        message: "File converted successfully.",
        data: {
            file: `${config.process.processedDir}/${fileName}.mp3`
        },
    };
};
