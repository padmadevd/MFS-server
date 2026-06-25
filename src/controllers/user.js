import { prisma } from "../db/db.js";
import { userService } from "../services/user.js";

class UserController
{
  async signup(req, res)
  {
    try
    {
      await prisma.$transaction(async (tx) => {

        const { email, password, first_name, last_name, mobile_no, is_admin, address } = req.body;

        const result = await userService.signup(tx, email, password, first_name, last_name, mobile_no, address, is_admin);
        if (!result) return res.status(400).json({
          message: "User already exists"
        })
      
        res.status(200).json({
          message: "Sign-in successfully"
        })
      })
    }
    catch (error)
    {
      res.status(400).json({
        message: "Internal error"
      })
    }
  }

  async login(req, res)
  {
    try
    {
      await prisma.$transaction(async (tx) => {

        const { email, password } = req.body;

        const result = await userService.login(tx, email, password);
        if (!result) return res.status(400).json({
          message: "Invalid user credentials"
        });

        res.cookie('sessionToken', result.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 30 * 60 * 60 * 1000
        });

        res.status(200).json({
          userId: result.userId,
          token: result.token,
          message: "Log-in Successful"
        });
      })
    }
    catch (error)
    {
      console.log(error)

      res.status(400).json({
        message: "Internal error"
      })
    }
  }

  async authenticate(req, res, next)
  {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(400).json({
      message: "No session token"
    });

    const user = userService.authenticate(token);
    if (!user) return res.status(400).json({
      message: "Session expired"
    });

    next();
  }
}

const userController = new UserController;
export { userController };
