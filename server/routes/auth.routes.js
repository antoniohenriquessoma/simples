import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userController from '../controllers/user.controller';


const router = express.Router()

router.route('/auth/signin').post(authCtrl.signin)
router.route('/auth/signout').get(authCtrl.signout)


//router.route('/api/users/:userId').get(authCtrl.requireSignin, userCtrl.read).put(authCtrl.requireSignin)

export default router