rm -rf ./dist
npm run build
chmod a+x ./dist/src/cli.js
npm run format
npm run lint
npm run test
npm link
