import express from 'express';

import { getUserProfile } from '../controllers/profile/profile.controllers.js';

export const router = express.Router();

//profile
router.get('/get-user-profile', getUserProfile);
