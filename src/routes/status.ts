import { Router } from "express";
import { config } from "../config";

export const statusRouter = Router();

statusRouter.get("/status/:fileName", (req, res) => {
    const status = config.process.queue.get(req.params.fileName);

    if (!status) {
        return res.status(404).send({
            status: "error",
            message: "File not found.",
        });
    }

    return res.status(200).send(status);
});