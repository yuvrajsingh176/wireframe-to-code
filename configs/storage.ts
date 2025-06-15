import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'my_uploads',
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

export const upload = multer({ storage });
