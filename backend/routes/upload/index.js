const path = require('path');
const router = require('express').Router();
const multer = require('multer');
const { protect, isAdmin } = require('../../middleware/authorization');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const checkFileType = (file, cb) => {
  const fileTypes = /jpg|jpeg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) return cb(null, true);
  else cb('Only allowed to upload images with extension jpg, jpeg or png');
};

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.post('/', protect, isAdmin, upload.single('image'), (req, res) => {
  res.send(`/${req.file.pat}`);
});

module.exports = router;
