const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || 'v1';

app.get('/', (req, res) => {
  // Simulate broken version if version is v3
  if (VERSION === 'v3') {
    console.error('Simulating a crash for version v3!');
    res.status(500).send('Internal Server Error: Application crashed in v3!');
  } else {
    res.send(`Hello from Kubernetes! App Version: ${VERSION}\n`);
  }
});

app.get('/health', (req, res) => {
  if (VERSION === 'v3') {
    // Failing the health check purposefully for v3 to demonstrate failed rolling update
    res.status(500).send('Unhealthy');
  } else {
    res.status(200).send('OK');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} (Version: ${VERSION})`);
});
