import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'my_uploads',
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

export const upload = multer({ storage });
