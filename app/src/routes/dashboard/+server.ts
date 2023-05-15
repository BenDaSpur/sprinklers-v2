import { error } from '@sveltejs/kit';
import { connectToDB } from '$lib/db';
import moment from 'moment-timezone';
import * as dotenv from 'dotenv';
dotenv.config();

const tz = process.env.TIMEZONE || 'America/Denver';

export async function GET({ url }) {
	const dbConnection = await connectToDB();
	const weather = await dbConnection.query(
		`SELECT temperature, description, humidity, precip_chance, datetime::timestamp without time zone
		FROM weather where datetime > '${moment().tz(tz).subtract(1, 'hours').format('YYYY-MM-DD HH:00')}'
		ORDER BY datetime ASC	
		`
	);

	const highLows = await dbConnection.query(
		`SELECT max(temperature)::integer, min(temperature)::integer, date(datetime) as date, max(precip_chance)::integer as precip_chance
		FROM weather where datetime >= '${moment().tz(tz).format('YYYY-MM-DD')}'
		GROUP BY date(datetime) ORDER BY date(datetime) ASC
		`
	);

	// console.log(highLows.rows);

	dbConnection.release();
	// return { weather: weather.rows };

	return new Response(JSON.stringify({ weather: weather.rows, highLows: highLows.rows }));
}
