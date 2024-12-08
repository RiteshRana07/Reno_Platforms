// /pages/api/getSchools.js
import mysql from 'mysql2';

export default function handler(req, res) {
  const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST, // Use environment variables
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  const query = 'SELECT * FROM schools';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching schools:', err);
      res.status(500).json({ error: 'Error fetching schools' });
      return;
    }
    res.status(200).json(results);
  });

  connection.end();
}
