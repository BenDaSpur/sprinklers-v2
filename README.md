# spinklers-v2

Built with sveltekit and docker to run on raspberry pi


## How to run
`docker-compose -f "docker-compose.yml" up -d --build`

Open site by going to `localhost`


## Tearing down
`docker compose down -v`


## Weather Cron

Setup a cron to run this command as often as you like: `docker exec sprinklers-v2-web-1 npx ts-node-esm src/routes/weather/weather.ts` 