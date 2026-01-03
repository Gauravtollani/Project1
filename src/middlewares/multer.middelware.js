import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) { // file kaha store hogi
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname ) // file ka naam kya hoga
  }
})

export const upload = multer({ 
    storage 
});