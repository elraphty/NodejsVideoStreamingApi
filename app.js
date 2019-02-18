const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());

app.listen(PORT, () => {
  console.log('\x1b[33m%s\x1b[0m', `Listening of PORT ${PORT}`);
});