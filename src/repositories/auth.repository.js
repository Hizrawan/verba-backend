import db from "../config/database.js";
import { QueryTypes } from "sequelize";

export const findByFirebaseUid = async (uid) => {
  const result = await db.query(
    `SELECT * FROM "Users" WHERE "firebase_uid" = :uid`,
    { type: QueryTypes.SELECT, replacements: { uid } }
  );
  return result[0] || null;
};

async function createUser({ firebase_uid, email, name, photo_url, role }) {
  const now = new Date();
  const query = `
    INSERT INTO Users (firebase_uid, email, name, photo_url, role, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(query, [
    firebase_uid,
    email,
    name || null,
    photo_url || null,
    role,
    now,
    now
  ]);

  // Ambil record yang baru dibuat
  const [rows] = await db.execute('SELECT * FROM Users WHERE id = ?', [result.insertId]);
  return rows[0];
}

async function findByEmail(email) {
  const [rows] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
}

async function findByFirebaseUid(firebase_uid) {
  const [rows] = await db.execute('SELECT * FROM Users WHERE firebase_uid = ?', [firebase_uid]);
  return rows[0];
}

module.exports = {
  createUser,
  findByEmail,
  findByFirebaseUid
};
