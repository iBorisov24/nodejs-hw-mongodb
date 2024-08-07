import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/constants.js';
import { Users } from '../models/User.js';
import { Sessions } from '../models/Session.js';

export const registerUser = async (payload) => {
  const user = await Users.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  console.log(hashedPassword);
  return await Users.create({ ...payload, password: hashedPassword });
};

export const loginUser = async (payload) => {
  const user = await Users.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Sessions.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await Sessions.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};
export const refreshUser = async (payload) => {};
