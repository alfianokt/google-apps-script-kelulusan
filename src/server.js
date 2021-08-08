// Run local server

require('dotenv/config');
const app = require('./../api');
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(Date.now(), `App run on port ${PORT}`);
});