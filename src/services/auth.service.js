import admin from '../config/firebase.js';
import * as userRepo from './user.service.js';

export const registerUser = async ({ email, password, name, photo_url }) => {
  // create Firebase user
  const userRecord = await admin.auth().createUser({ email, password, displayName: name, photoURL: photo_url });

  // save in DB
  const user = await userRepo.createUser({
    firebase_uid: userRecord.uid,
    email,
    name,
    photo_url,
    role: 'user'
  });

  return user;
};

export const verifyToken = async (idToken) => {
  return admin.auth().verifyIdToken(idToken);
};
