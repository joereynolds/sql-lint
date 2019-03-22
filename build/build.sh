rm -rf ./dist
npm run build
chmod a+x ./dist/src/main.js
npm run format
npm run lint
npm run test
npm link
auto-changelog
