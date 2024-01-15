import { Router } from "express";
import { convert } from "../modules/convert";
import { config } from "../config";

export const convertRouter = Router();

convertRouter.get("/convert/:fileName", async (req, res) => {

    const convertData = await convert(req.params.fileName);

    config.process.queue.set(req.params.fileName, convertData);

    return res.status(200).send(convertData);
});