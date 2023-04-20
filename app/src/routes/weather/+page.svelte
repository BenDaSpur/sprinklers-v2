<script>
	import { Row, Col } from 'sveltestrap';
	import moment from 'moment-timezone';
	export let data;
	// @ts-ignore
	import Chart from 'svelte-frappe-charts';

	const chartData = {
		labels: data.weather.map((period) => moment(period.startTime).format('L LT')),
		datasets: [
			{
				name: 'Temperature',
				values: data.weather.map((period) => period.temperature)
			},
			{
				name: 'Precipitation',
				values: data.weather.map((period) => period.probabilityOfPrecipitation.value)
			}
		]
	};
</script>

<Chart data={chartData} type="line" />
<!-- 
{#each data.weather as period}
	<Row>
		<Col>
			
			{period.temperature} F
			{moment(period.startTime).format('L LT')} -
			
			{period.probabilityOfPrecipitation.value}%
			
			
			
			{period.shortForecast}
			{period.detailedForecast}
		</Col>
	</Row>
{/each} -->
