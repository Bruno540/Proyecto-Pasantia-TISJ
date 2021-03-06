import multer from "multer";
import path from "path";
import fs from "fs";
import { baseDir } from "../application";
import { ApiError } from "../../config/api-error";

export const empresaStorage = () => {
    const regExp = new RegExp("/jpeg|jpg|png|gif/");
    return multer.diskStorage({
        destination: (request, file, callback) => {
            if (regExp.test(file.mimetype)) {
                return callback(null, "uploads/empresa");
            }
            else {
                return;
            }
        },

        filename: (request, file, callback) => {
            return callback(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
        }
    });
}

export const removerArchivo = (relativePath: string) => {
    try {
        fs.unlinkSync(path.join(baseDir + "/../../" + relativePath));
    } catch (error) {

    }
}