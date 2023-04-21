# spinklers-v2

Built with sveltekit and docker to run on raspberry pi


## How to run
`docker compose up` or add `-d` to run in background

Open site by going to `localhost`


## Tearing down
`docker compose down` or add `-v` to remove data


## Weather Cron

Setup a cron to run this command as often as you like: `docker exec sprinklers-v2-web-1 npx ts-node-esm src/routes/weather/weather.ts` 