import { Client, Pool } from 'pg';

const pool = new Pool({
	database: 'sprinklers',
	user: 'sprinkle',
	host: 'db',
	password: 'tinkles',
	port: 5432
});

export const connectToDB = async () => await pool.connect();
