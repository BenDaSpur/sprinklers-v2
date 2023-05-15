<script lang="ts">
	import { Col, Icon, Nav, NavItem, NavLink, Row } from 'sveltestrap';
	import moment from 'moment-timezone';
	const getData = async () => {
		const response = await fetch('/dashboard');
		const data = await response.json();
		return data;
	};
</script>

<Nav vertical>
	<NavLink href="/">Dashboard</NavLink>
	<NavLink href="sprinklers">GPIO</NavLink>
	<NavLink href="zones">Zones</NavLink>
	<NavLink href="schedules">Schedules</NavLink>
	<NavLink href="#">History</NavLink>
	<NavLink href="weather">Weather</NavLink>
</Nav>
{#await getData() then weather}
	<Row>
		<Col>
			<div class="m-3 weather-side-nav">
				<div>
					{moment(weather.highLows[0].date).utc().format('dddd')}
				</div>
				<div>
					<Icon name="arrow-up-circle-fill" />
					{weather.highLows[0].max}

					<Icon name="arrow-down-circle-fill" />
					{weather.highLows[0].min}
				</div>
				<div>
					<Icon name="droplet-fill" />
					{weather.highLows[0].precip_chance}%
				</div>
				<div>
					{weather.weather[0].description}
				</div>
			</div>
		</Col>
	</Row>
{/await}

<style>
	.weather-side-nav div {
		margin: 0.1rem 0;
	}
</style>
