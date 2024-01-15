import multer from "multer";
import { config } from "../config";
import { NextFunction, Request, Response, Router } from "express";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.file.uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: config.file.maxSize,
    },
    fileFilter(req, file, cb) {
        if (config.file.allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    },
});

export const uploadRouter = Router();

uploadRouter.post("/upload", upload.single("file"), (req, res) => {

    config.process.queue.set(req.file?.filename, {
        status: "success",
        message: "File uploaded successfully.",
    });

   return res.status(200).send({
        status: "success",
        message: "File uploaded successfully.",
        data: {
            filename: req.file?.filename,
            mimetype: req.file?.mimetype,
            size: req.file?.size,
        }
    });
});

uploadRouter.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error during file upload:", err);
    
    if (err instanceof multer.MulterError) {
        res.status(400).send({
            status: "error",
            message: "File upload error",
        });
    } else if (err) {
        res.status(500).send({
            status: "error",
            message: "Internal server error",
        });
    } else {
        next();
    }
});