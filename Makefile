install:
	npm ci && npm run build

start:
	npm start

build:
	npm build

lint:
	npx eslint .

sass:
	npm run sass:watch