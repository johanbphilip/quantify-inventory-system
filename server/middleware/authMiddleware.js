import dotenv from 'dotenv';
import { supabase } from '../utils/dbConn.js';
import jwt from 'jsonwebtoken';

dotenv.config();

export const authenticateRequest = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({
      valid: false,
      message: 'Unauthorized: No tokens provided. From the middleware',
    });
  }
  console.log('Token found!');

  try {
    if (accessToken) {
      console.log('access token found, going to find user');
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(accessToken);

      if (!error && user) {
        req.user = user;
        return next();
      }
    }
    if (refreshToken) {
      console.log('no access token found, going to refresh');

      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error || !data?.session) {
        return res
          .status(401)
          .json({ error: error || 'Invalid refresh token' });
      }

      const { access_token: newAccessToken, refresh_token: newRefreshToken } =
        data.session;

      // Set new cookies
      console.log('Setting new cookies');
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 3600 * 1000,
      });

      res.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 7 * 24 * 3600 * 1000,
      });
      console.log('New tokens set in cookies');
      console.log('getting user with new access token');
      const {
        data: { user },
      } = await supabase.auth.getUser(newAccessToken);
      req.user = user;
      return next();
    }
    console.log('Nothing found about to rerturn error');
    return res.status(401).json({ valid: false, message: 'Unauthorized' });
  } catch (error) {
    console.log('Middle ware error: ', error);
    return res.status(401).json({
      message: 'Unauthorized: Invalid or expired token.',
      valid: false,
      error,
    });
  }
};
