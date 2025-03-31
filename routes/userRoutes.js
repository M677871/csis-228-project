const express = require('express');
const userController = require('../controllers/userController');
const {validateUserId , validateUserEmail , validateUserLogin , 
validateUser, validateUserChangePassword} = require('../validators/user.dto');
const router = express.Router();


router.get('/' , userController.getUsers);
router.get('/:id',validateUserId, userController.getUserById);
router.get('/email',validateUserEmail,userController.getUserByEmail);
router.put('/changePassword' ,validateUserChangePassword, userController.changePassword); 
router.post('/', validateUser, userController.createUser);
router.put('/:id',validateUserId,validateUser, userController.updateUser);
router.delete('/:id', validateUserId ,userController.deleteUser);
router.post('/login', validateUserLogin,userController.login); 


module.exports = router;