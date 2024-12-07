import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'rana12',
  database: 'school_management',
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT id, name, address, city, image FROM schools');
      connection.end();
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Database error!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed!' });
  }
}
