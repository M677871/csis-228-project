const express = require('express');
const userController = require('../controllers/userController');
const {validateUserId , validateUserEmail , validateUserLogin , 
validateUser, validateUserChangePassword} = require('../validators/user.dto');
const router = express.Router();


router.get('/view-users', userController.loadUsersForm);
router.get ('/view-users', userController.loadUsersViewww);
router.get ('/view-users/:id', userController.loadUserView);

router.get( '/login',  userController.showLoginForm);
router.post('/login',  validateUserLogin, userController.loginForm);
router.get( '/signup', userController.showSignupForm);
router.post('/signup', validateUser,      userController.signupForm);

router.get('/change-password', userController.showchangepasswordForm);
router.post('/change-password', validateUserChangePassword, userController.changePasswordForm);

router.delete('/delete-user/:id', userController.deleteUserr);

router.get('/edit-form/:id', userController.loadUserForm);
router.post('/update-user/:id', userController.updateUser);

router.get('/' , userController.getUsers);
router.get('/:id',validateUserId, userController.getUserById);
router.get('/email/:email',validateUserEmail,userController.getUserByEmail);
router.put('/changePassword' ,validateUserChangePassword, userController.changePassword); 
router.post('/', validateUser, userController.createUser);
router.put('/:id',validateUserId,validateUser, userController.updateUser);
router.delete('/:id', validateUserId ,userController.deleteUser);
//router.post('/login', validateUserLogin,userController.login); 


module.exports = router;