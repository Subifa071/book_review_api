const { models } = require('mongoose')
const multer = require('multer')
//for unique name
const uuid = require('uuid').v4
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname.toLowerCase())
    cb(null, `${file.fieldname}${uuid()}${ext}`)
  },
})

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname.toLowerCase())
  if (!ext.match(/png|jpg|jpeg/)) {
    return cd(new Error('Only png, jpg and jpeg are allowed'), false)
  }
  cb(null, true)
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 },
})
module.exports = upload
