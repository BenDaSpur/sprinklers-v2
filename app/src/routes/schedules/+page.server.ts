import { fail } from '@sveltejs/kit';
import { connectToDB } from '$lib/db';
import type { PageServerLoad, Actions } from './$types';

export const load = (async (params) => {
	const dbConnection = await connectToDB();
	const schedules = await dbConnection.query('SELECT * FROM schedules');
	const sprinklers = await dbConnection.query('SELECT * FROM zone');
	// console.log('sprinklers:', sprinklers.rows);
	dbConnection.release();
	return { sprinklers: sprinklers.rows, schedules: schedules.rows };
}) satisfies PageServerLoad;

export const actions: Actions = {
	newSchedule: async ({ request }) => {
		const theFormData = await request.formData();
		// console.log(theFormData);
		let days: number[] = [];
		let zones: { zone: number; time: number }[] = [];
		let startTime;
		theFormData.forEach((value, key) => {
			console.log(key, value);

			if (key.includes('day')) days.push(parseInt(value.toString()));
			if (key.includes('zone')) {
				zones.push({
					zone: parseInt(key.split('-')[1]),
					time: parseInt(value.toString())
				});
			}
			if (key.includes('startTime')) startTime = value;
			// console.log(key, value);
		});
		//zones, start_time, days, is_disabled

		// console.log(theFormData.get('gpio'), theFormData.get('description'));
		const dbConnection = await connectToDB();
		const newSchedule = await dbConnection.query(
			'INSERT INTO schedules (zones, start_time, days, is_disabled) VALUES ($1, $2, $3, $4) RETURNING *',
			[JSON.stringify(zones), startTime, JSON.stringify(days), false]
		);
		dbConnection.release();
		return { schedule: newSchedule.rows };
	},

	deleteSchedule: async ({ request }) => {
		const theFormData = await request.formData();
		console.log(theFormData);
		const dbConnection = await connectToDB();
		const newSchedule = await dbConnection.query('DELETE FROM schedules WHERE id = $1', [
			theFormData.get('id')
		]);
		dbConnection.release();
		return { schedule: newSchedule.rows };
	}

	// newSprinkler: async ({ request }) => {
	// 	const theFormData = await request.formData();
	// 	console.log(theFormData.get('gpio'), theFormData.get('description'));
	// 	const dbConnection = await connectToDB();
	// 	const newSprinkler = await dbConnection.query(
	// 		'INSERT INTO sprinkler (gpio, description) VALUES ($1, $2) RETURNING *',
	// 		[theFormData.get('gpio'), theFormData.get('description')]
	// 	);
	// 	dbConnection.release();
	// 	return { sprinkler: newSprinkler.rows };
	// }
};
