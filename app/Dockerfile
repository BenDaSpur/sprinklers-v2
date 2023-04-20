FROM node:18

# install dependencies
WORKDIR /app
COPY package.json ./

# RUN npm ci --production
RUN npm i

# Copy all local files into the image.
# COPY . .

# RUN npm run build

###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM node:18-slim

WORKDIR /app


COPY --from=0 /app .
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
# CMD ["node", "./build"]