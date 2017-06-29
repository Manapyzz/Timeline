const express = require('express');

const app = express();
const server = require('http').Server(app);

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Server is listening on port ${port}`));