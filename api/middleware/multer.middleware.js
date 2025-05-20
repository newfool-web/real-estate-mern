import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Configure multer
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB limit
    }
}).single('file');

// Wrapper middleware to handle multer errors
export const handleMulterUpload = (req, res, next) => {
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ 
                    error: "File size must be less than 2MB" 
                });
            }
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // An unknown error occurred
            return res.status(500).json({ error: err.message });
        }
        // Everything went fine
        next();
    });
}; 