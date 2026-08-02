// Reflection Journey — pure static file server for local development.
// No API, no database: every answer stays in the participant's own browser
// (localStorage) and is never transmitted anywhere. Ready to deploy as-is
// to Netlify (publish directory: "public") or any static host.
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use((_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Reflection Journey running at http://localhost:${PORT}`);
});
