import { prisma } from '../db/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserService
{
  async createUserAddress(tx, userId, {title, countryName, stateName, cityName, addressLine1, addressLine2})
  {
    await tx.user_address.create({
      data: {
        title: title,
        user_id: userId,
        country_name: countryName,
        state_name: stateName,
        city_name: cityName,
        address_line_1: addressLine1,
        address_line_2: addressLine2
      }
    })
  }

  async signup(tx, email, password, firstName, lastName, mobile, address, isAdmin)
  {
    const existingUser = await prisma.app_users.findUnique({ where: { email } });
    if (existingUser) return undefined;

    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, passwordSalt);
    const user = await tx.app_users.create({
      data: {
        email: email,
        mobile_no: mobile,
        password_hash: passwordHash,
        password_salt: passwordSalt,
        first_name: firstName,
        last_name: lastName,
        is_admin: isAdmin
      }
    });

    await this.createUserAddress(tx, user.user_id, address);

    return { userId: user.user_id };
  }

  async login(tx, email, password)
  {
    const user = await tx.app_users.findUnique({ where: { email } });
    if (!user) return undefined;

    const passwordValid = bcrypt.compare(password, user.password_hash);
    if (!passwordValid) return undefined;

    const userToken = jwt.sign({
      userId: user.user_id.toString(),
      isAdmin: user.is_admin.toString(),
    }, process.env.JWT_KEY, { expiresIn: '30m' });

    return { userId: user.user_id.toString(), token: userToken };
  }

  async authenticate(token)
  {
    const user = undefined;
    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
      if (err) return;
      user = data;
    })
    return user;
  }
}

const userService = new UserService;
export { userService };
