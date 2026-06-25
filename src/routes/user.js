import express from 'express'
import { userController } from '../controllers/user.js'

const userRouter = express.Router();

userRouter.post('/signup', userController.signup.bind(userController));
userRouter.post('/login', userController.login.bind(userController));
userRouter.get('/hello', userController.authenticate, (req, res) => {
    res.status(200).json({
        message: "Hello..."
    })
})

export { userRouter };
