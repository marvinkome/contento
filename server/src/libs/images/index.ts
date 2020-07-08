import { Request } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Datauri from 'datauri';
import path from 'path';

const storage = multer.memoryStorage();
const dUri = new Datauri();

export const setup_cloudinary = () => {
    return cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
};

export const uploader = cloudinary.uploader;
export const multerUploads = multer({ storage });
export const dataUri = (req: Request) =>
    dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
