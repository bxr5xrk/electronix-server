import { Pool, QueryResult, QueryResultRow } from 'pg';
import { config } from '../config';

const pool = new Pool({
  connectionString: config.DB.dbUrl,
});

export async function query<T extends QueryResultRow>(
  text: string,
  params?: any
): Promise<QueryResult<T>> {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
}

export async function createConnection() {
  try {
    await pool.connect();
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}
