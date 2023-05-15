import { fail } from '@sveltejs/kit';
import { connectToDB } from '$lib/db';
import type { PageServerLoad, Actions } from './$types';
import moment from 'moment-timezone';
import * as dotenv from 'dotenv';
dotenv.config();
const tz = process.env.TIMEZONE || 'America/Denver';

export const load = (async (params) => {
	const dbConnection = await connectToDB();
	const weather = await dbConnection.query(
		`SELECT temperature, description, humidity, precip_chance, datetime::timestamp without time zone
		FROM weather where datetime > '${moment().tz(tz).subtract(1, 'hours').format('YYYY-MM-DD HH:00')}'
		ORDER BY datetime ASC	
		`
	);
	dbConnection.release();
	return { weather: weather.rows };
}) satisfies PageServerLoad;

// export const actions: Actions = {
// 	newSprinkler: async ({ request }) => {
// 		const theFormData = await request.formData();
// 		console.log(theFormData.get('gpio'), theFormData.get('description'));
// 		const dbConnection = await connectToDB();
// 		const newSprinkler = await dbConnection.query(
// 			'INSERT INTO sprinkler (gpio, description) VALUES ($1, $2) RETURNING *',
// 			[theFormData.get('gpio'), theFormData.get('description')]
// 		);
// 		dbConnection.release();
// 		return { sprinkler: newSprinkler.rows };
// 	}
// };
