// /pages/api/addSchool.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, address, city, state, contact, image, email_id } = req.body;

    const dbConfig = {
      host: process.env.DATABASE_HOST, // Use environment variables
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    };

    try {
      const connection = await mysql.createConnection(dbConfig);
      const query = 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
      await connection.execute(query, [name, address, city, state, contact, image, email_id]);
      connection.end();
      res.status(200).json({ message: 'School added successfully!' });
    } catch (err) {
      console.error('Error inserting school:', err);
      res.status(500).json({ error: 'Error inserting school' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
