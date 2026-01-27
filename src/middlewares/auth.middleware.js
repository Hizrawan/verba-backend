import admin from "../config/firebase.js"; 
import db from "../config/database.js";    

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = await admin.auth().verifyIdToken(token);

    const firebaseUid = decoded.uid;
    const email = decoded.email;
    const name = decoded.name || null;

    const result = await db.query(
      `SELECT * FROM "Users" WHERE firebase_uid = $1`,
      [firebaseUid]
    );

    let user;

    if (result.rows.length === 0) {
      const insert = await db.query(
        `INSERT INTO "Users" (firebase_uid, email, name)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [firebaseUid, email, name]
      );
      user = insert.rows[0];
    } else {
      user = result.rows[0];
    }

    req.user = user;
    next();

  } catch (err) {
    console.error("AUTH ERROR:", err);
    res.status(401).json({ error: err.message });
  }
};
