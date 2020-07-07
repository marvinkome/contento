import { Request } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import DataUriParser from 'datauri/parser';
import path from 'path';

const storage = multer.memoryStorage();
const dUri = new DataUriParser();

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
