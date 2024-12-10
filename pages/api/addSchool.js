import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // Log environment variables for debugging
  console.log('Environment Variables:', {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, address, city, state, contact, image, email_id } = req.body;

  if (!name || !address || !city || !state || !contact || !email_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const dbConfig = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  };

  try {
    console.log('Attempting to connect to the database...');
    const connection = await mysql.createConnection(dbConfig);

    const query = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, address, city, state, contact, image, email_id];

    const [result] = await connection.execute(query, values);

    console.log('Insert result:', result);

    await connection.end();

    return res.status(200).json({ message: 'School added successfully!' });
  } catch (error) {
    console.error('Database connection or query error:', error);
    return res.status(500).json({ error: 'Failed to add school', details: error.message });
  }
}
