const Router = require('express');
const router = new Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'static/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '.jpg');
    }
})
const upload = multer({ storage: storage });
const scooterController = require('../controllers/scooterController');


router.post('/', upload.single('image'), scooterController.create);
router.get('/', scooterController.get);
router.get('/:id', scooterController.getItem);


module.exports = router;