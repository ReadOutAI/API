import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { config } from "../config";

const tts = new MsEdgeTTS();

export const textToAudio = async (text: string, fileName: string) => {
    try {
        await tts.setMetadata("en-US-AriaNeural", OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
        const filePath = await tts.toFile(`${config.process.processedDir}/${fileName}.mp3`, text);
        console.log(filePath);

        return {
            status: "success",
            message: "File converted successfully.",
            data: {
                filePath: filePath
            }
        }
    } catch (err) {
        console.log(err);
        return null;
    }
};