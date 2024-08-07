import { Users } from '../models/User.js';
import { loginUser, registerUser } from '../services/auth.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/constants.js';

export const registerUserController = async (req, res, next) => {
  const newUser = await registerUser(req.body);

  res.send({
    status: 201,
    message: 'Successfully registered a user!',
    data: newUser,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
