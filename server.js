const { createServer } = require('http');
const path = require('path');
const { createRequire } = require('module');

const webRequire = createRequire(path.join(__dirname, 'web', 'package.json'));
const backendRequire = createRequire(path.join(__dirname, 'backend', 'package.json'));

const next = webRequire('next');
const backendApp = backendRequire('./dist/app.js').default;

const port = process.env.PORT || 3000;
const nextApp = next({ dev: false, dir: path.join(__dirname, 'web') });
const handleNext = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  createServer((req, res) => {
    if (req.url.startsWith('/api/')) {
      backendApp(req, res);
    } else {
      handleNext(req, res);
    }
  }).listen(port, () => {
    console.log(`Ready on port ${port}`);
  });
});
