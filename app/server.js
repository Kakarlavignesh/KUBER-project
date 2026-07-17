const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || 'v1';

// Serve static UI files from public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/info', (req, res) => {
  if (VERSION === 'v3') {
    console.error('Simulating a crash for version v3!');
    res.status(500).json({ error: 'Internal Server Error: Application crashed in v3!' });
  } else {
    res.json({ version: VERSION, message: 'Welcome to the Kubernetes Demo Cluster!' });
  }
});

app.get('/health', (req, res) => {
  if (VERSION === 'v3') {
    res.status(500).send('Unhealthy');
  } else {
    res.status(200).send('OK');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} (Version: ${VERSION})`);
});
