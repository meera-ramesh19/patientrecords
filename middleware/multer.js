const multer = require("multer");
const path = require("path");

module.exports = multer({
    storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {

//         if (path.extname(file.originalname) === 'jpeg' || path.extname(file.originalname) === 'jpg' || path.extname(file.originalname) === 'png' || path.extname(file.originalname) === 'gif' || path.extname(file.originalname) === 'pdf') {
//             return cb(null, true);
//         }
//         cb(new Error('Only ".zip" is allowed'));
//     },
});
// var upload = multer({ storage: multer.diskStorage })
// var uploadMultiple = upload.fields([{ name: 'multi-files', maxCount: 10 }])

// module.exports = uploadMultiple;
//module.exports.files={
//     storage:function(){
//         var storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//           cb(null, 'public/files/')
//         },
//         filename: function (req, file, cb) {
//             cb(null, file.originalname)
//         }
//       })

//       return storage;
// },