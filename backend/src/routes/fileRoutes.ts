import express from 'express';
import { uploadFile, getUserFiles } from '../controllers/fileController';
import protect from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadFile);
router.get('/', protect, getUserFiles);

export default router;