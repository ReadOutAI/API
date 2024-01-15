import { parseOfficeAsync } from "officeparser";
import { config } from "../config";

const officeConfig = {
    newlineDelimiter: " ",  // Separate new lines with a space instead of the default \n.
    ignoreNotes: true       // Ignore notes while parsing presentation files like pptx or odp.
}

export const extractText = async (fileName: string) => {
    try {
        const text = await parseOfficeAsync(`${config.file.uploadDir}/${fileName}`, officeConfig);
        return text;
    } catch (err) {
        console.log(err);
        return null;
    }
};