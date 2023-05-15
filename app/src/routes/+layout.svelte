<script>
	import { Styles, Container, Row, Col } from 'sveltestrap';
	import SideNav from './SideNav.svelte';
</script>

<Styles />
<Container>
	<div class="app">
		<Row>
			<Col lg={2}>
				<SideNav />
			</Col>
			<Col lg={10}>
				<main>
					<slot />
				</main>
			</Col>
		</Row>
	</div>
</Container>

<style>
</style>
