import { supabase } from '../../utils/dbConn.js';

export const getUserProfile = async (req, res) => {
  try {
    const { data, error } = await supabase.auth.getUser(access_token);
    if (error) {
      return res.status(401).json({ message: error.message });
    }
    const { user } = data;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
