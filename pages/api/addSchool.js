import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'rana12',
  database: 'school_management',
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, address, city, state, contact, email_id, image } = req.body;
    try {
      const connection = await mysql.createConnection(dbConfig);
      const query = `
        INSERT INTO schools (name, address, city, state, contact, image, email_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      await connection.execute(query, [name, address, city, state, contact, image, email_id]);
      connection.end();
      res.status(200).json({ message: 'School added successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Database error!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed!' });
  }
}
