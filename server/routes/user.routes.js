import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router();

router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuth, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuth, userCtrl.remove)

router.param('userId',userCtrl.userById)

export default router;