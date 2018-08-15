rm -rf ./dist
npm run build
npm run lint
npm run test
npm link
./tests.sh
