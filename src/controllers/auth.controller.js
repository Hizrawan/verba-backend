import admin from '../config/firebase.js';
import { createUserInDB } from '../services/user.service.js';

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, name, photo_url } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email & password wajib diisi' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password minimal 6 karakter' });
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name || null,
      photoURL: photo_url || null
    });

    const newUser = await createUserInDB({
      firebase_uid: userRecord.uid,
      email,
      name,
      photo_url,
      role: 'user'
    });

    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ error: 'Email sudah terdaftar' });
    }
    next(error);
  }
};
