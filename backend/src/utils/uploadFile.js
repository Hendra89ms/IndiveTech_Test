import multer from "multer"
import path from 'path'

// UPLOAD KE CLOUDINARY
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'src/uploads/')
//     },
//     filename: function (req, file, cb) {
//         // Berikan nama file tetap, misalnya 'uploaded-file.ext'
//         const filename = 'uploaded-file' + path.extname(file.originalname);
//         cb(null, filename);
//     },
// })
const storage = multer.memoryStorage();

export const uploadMdw = multer({
    storage: storage,
});

