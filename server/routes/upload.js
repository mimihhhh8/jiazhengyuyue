const express = require("express");
const router = express.Router();
const uploadController = require("../controller/upload")

router.post("/urlImage", uploadController.uploadImage)
router.post("/urlPic", uploadController.updatePic)



module.exports = router;