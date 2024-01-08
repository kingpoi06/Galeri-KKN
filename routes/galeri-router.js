const express = require("express")
const router = express.Router()

const galeriController = require("../controller/galeri-controller")

router.get("/", galeriController.getAll)
router.get("/:id", galeriController.getById)
router.post("/", galeriController.create)
router.put("/:id", galeriController.update)
router.delete("/:id", galeriController.delete)

module.exports = router