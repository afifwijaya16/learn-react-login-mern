const express       = require ('express');
const router        = express.Router();
const { 
    DaftarUser,
    LoginUser,
    GetUser,
    forgotPassword,
    resetPassword
}                   = require('../controllers/userController')
const { 
    runValidation,
    validationDaftar,
    validationLogin
}                   = require('../validations')
const middleware    = require('../middlewares/middleware')

router.post('/daftar', validationDaftar, runValidation, DaftarUser)
router.post('/login', validationLogin, runValidation, LoginUser)
router.get('/user', middleware, GetUser)
router.put('/forgotpassword', forgotPassword)
router.put('/resetpassword', resetPassword)
module.exports = router