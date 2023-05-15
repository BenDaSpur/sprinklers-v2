import * as dotenv from 'dotenv';
import moment from 'moment-timezone';
import pg from 'pg';

dotenv.config();

const pool = new pg.Pool({
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	host: 'db',
	password: process.env.POSTGRES_PASSWORD,
	port: 5432
});

export const connectToDB = async () => await pool.connect();

const getCurrentTime = async () => {
	if (!process.env.TIMEZONE) return;
	return moment().tz(process.env.TIMEZONE);
};

const getSchedules = async () => {
	const dbConnection = await connectToDB();
	const schedules = await dbConnection.query('SELECT * FROM schedules');
	dbConnection.release();
	return schedules.rows;
};

const runSchedules = async () => {
	if (!process.env.TIMEZONE) return;
	const time = await getCurrentTime();
	const schedules = await getSchedules();
	schedules.forEach((schedule) => {
		const { start_time, days, zones } = schedule;

		if (days.includes(time?.day())) {
			if (!start_time) return;
			console.log(time?.format('HH:mm'), start_time);

			if (start_time.includes(time?.format('HH:mm'))) {
				console.log('time to run');

				// zones.forEach((zone) => {
				// 	// turn on zone
				// });
			}
		}

		// const isDisabled = days.includes(day);
	});
};

runSchedules();
