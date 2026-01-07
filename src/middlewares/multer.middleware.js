import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Multer is processing file:", file.originalname); // Yeh terminal mein aana chahiye
    cb(null, "./public/temp") // Yeh path aapke main folder se start hona chahiye
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

export const upload = multer({ 
    storage 
});