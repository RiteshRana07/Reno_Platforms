import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' }); // Ensures only POST is allowed
  }

  const { name, address, city, state, contact, email_id, image } = req.body;

  if (!name || !address || !city || !state || !contact || !email_id) {
    return res.status(400).json({ error: 'Missing required fields' }); // Validates inputs
  }

  const dbConfig = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    const query = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, address, city, state, contact, image, email_id];
    await connection.execute(query, values);
    await connection.end();

    return res.status(200).json({ message: 'School added successfully!' });
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
}
