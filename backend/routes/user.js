const router = extress.Router()
const upload = require('../middleware/multer')
const {uploadToCloudinary, removeFromCloudinary}= require('../middleware/cloudinary')

router.post('/', async(req,res))



module.exports = router