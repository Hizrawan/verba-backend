import admin from "../config/firebase.js"; 
import db from "../config/database.js";    
import { QueryTypes } from "sequelize";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = await admin.auth().verifyIdToken(token);
    console.log("DECODED TOKEN:", decoded);

    const firebaseUid = decoded?.uid;
    if (!firebaseUid) return res.status(401).json({ error: "Firebase UID missing" });

    const email = decoded.email || null;
    const name = decoded.name || null;

    let result = await db.query(
      `SELECT * FROM "Users" WHERE firebase_uid = :uid`,
      { type: QueryTypes.SELECT, replacements: { uid: firebaseUid } }
    );

    let user;
    if (result.length === 0) {
      const insertResult = await db.query(
        `INSERT INTO "Users" (firebase_uid, email, name,createdAt, updatedAt)
         VALUES (:uid, :email, :name, now(), now())
         RETURNING *`,
        { 
          type: QueryTypes.INSERT, 
          replacements: { uid: firebaseUid, email, name } 
        }
      );
      user = insertResult[0][0]; 
    } else {
      user = result[0];
    }

    req.user = user;
    next();

  } catch (err) {
    console.error("AUTH ERROR:", err);
    res.status(401).json({ error: err.message });
  }
};
