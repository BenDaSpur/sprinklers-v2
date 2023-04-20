<script>
	import { Styles, Container, Row, Col } from 'sveltestrap';
	import SideNav from './SideNav.svelte';
</script>

<Styles />
<Container>
	<div class="app">
		<Row>
			<Col md={2}>
				<SideNav />
			</Col>
			<Col md={10}>
				<main>
					<slot />
				</main>
			</Col>
		</Row>
	</div>
</Container>

<style>
</style>
