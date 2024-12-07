import multer from 'multer';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/schoolImages',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  }),
});

export default function handler(req, res) {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ imageUrl: `/schoolImages/${req.file.filename}` });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
